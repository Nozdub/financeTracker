from datetime import date
from .models import RecurringRule, Income, Expense
from django.utils.timezone import now


def should_trigger_daily(rule, today):
    return True


def should_trigger_weekly(rule, today):
    return rule.start_date.weekday() == today.weekday()


def should_trigger_biweekly(rule, today):
    delta = (today - rule.start_date).days
    return rule.start_date.weekday() == today.weekday() and delta % 14 == 0


def should_trigger_monthly(rule, today):
    return rule.start_date.day == today.day


def should_trigger_quarterly(rule, today):
    months_passed = (today.year - rule.start_date.year) * 12 + (today.month - rule.start_date.month)
    return rule.start_date.day == today.day and months_passed % 3 == 0


def should_trigger_semiannual(rule, today):
    months_passed = (today.year - rule.start_date.year) * 12 + (today.month - rule.start_date.month)
    return rule.start_date.day == today.day and months_passed % 6 == 0


def should_trigger_yearly(rule, today):
    return rule.start_date.month == today.month and rule.start_date.day == today.day


FREQUENCY_HANDLERS = {
    'daily': should_trigger_daily,
    'weekly': should_trigger_weekly,
    'biweekly': should_trigger_biweekly,
    'monthly': should_trigger_monthly,
    'quarterly': should_trigger_quarterly,
    'semiannual': should_trigger_semiannual,
    'yearly': should_trigger_yearly,

}


def process_recurring_rules():
    today = now()
    rules = RecurringRule.objects.all()

    for rule in rules:
        if rule.start_date > today:
            continue
        if rule.end_date and rule.end_date.date() < today:
            continue

        handler = FREQUENCY_HANDLERS.get(rule.frequency)

        if handler and handler(rule, today):
            if rule.type == 'income':
                Income.objects.create(
                    user=rule.user,
                    date=today,
                    amount=rule.amount,
                    description=rule.description,
                    category=rule.category,
                    recurring=True,
                    frequency=rule.frequency,
                )
            elif rule.type == 'expense':
                Expense.objects.create(
                    user=rule.user,
                    date=today,
                    amount=rule.amount,
                    description=rule.description,
                    category=rule.category,
                    recurring=True,
                    frequency=rule.frequency,
                )


def calculate_running_total(transactions: list[dict]) -> list[dict]:
    total = 0.0
    for tx in transactions:
        total += tx["amount"]
        tx["running_total"] = total
    return transactions
