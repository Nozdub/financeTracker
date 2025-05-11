from django.core.management.base import BaseCommand
from django.utils.timezone import now
from finance.models import Expense
from finance.utils import get_next_due_date
from datetime import timedelta


class Command(BaseCommand):
    help = "Generates today\'s recurring expenses if they are due"

    def handle(self, *args, **kwargs):
        today = now().date()

        # Get all recurring expenses
        recurring_expenses = Expense.objects.filter(recurring=True)

        created_count = 0

        for expense in recurring_expenses:
            next_due = get_next_due_date(expense.date, expense.frequency)

            # If next due date is today, create new instance
            if next_due  == today:
                Expense.objects.create(
                    user=expense.user,
                    amount=expense.amount,
                    description=expense.description,
                    category=expense.category,
                    date=now(),
                    recurring=True,
                    frequency=expense.frequency
                )
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"{created_count} recurring expenses generated for today."))