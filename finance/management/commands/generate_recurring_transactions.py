from django.core.management.base import BaseCommand
from django.utils.timezone import now
from finance.models import Expense, Income
from finance.utils import get_next_due_date


class Command(BaseCommand):
    help = "Generates today's recurring transactions (expenses and incomes) if they are due"

    def handle(self, *args, **kwargs):
        today = now().date()
        created_expenses = 0
        created_incomes = 0

        # Handle recurring expenses
        recurring_expenses = Expense.objects.filter(recurring=True)
        for expense in recurring_expenses:
            next_due = get_next_due_date(expense.date, expense.frequency)
            if next_due == today:
                Expense.objects.create(
                    user=expense.user,
                    amount=expense.amount,
                    description=expense.description,
                    category=expense.category,
                    date=now(),
                    recurring=True,
                    frequency=expense.frequency
                )
                created_expenses += 1

        # Handle recurring incomes
        recurring_incomes = Income.objects.filter(recurring=True)
        for income in recurring_incomes:
            next_due = get_next_due_date(income.date, income.frequency)
            if next_due == today:
                Income.objects.create(
                    user=income.user,
                    amount=income.amount,
                    description=income.description,
                    category=income.category,
                    date=now(),
                    recurring=True,
                    frequency=income.frequency
                )
                created_incomes += 1

        self.stdout.write(self.style.SUCCESS(
            f"{created_expenses} recurring expenses and {created_incomes} recurring incomes generated for today."
        ))
