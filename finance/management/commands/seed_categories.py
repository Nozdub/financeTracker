from django.core.management.base import BaseCommand
from finance.models import Category


class Command(BaseCommand):
    help = 'Seeds predefined categories'

    def handle(self, *args, **kwargs):
        predefined_categories = [
            {"name": "Salary", "type": "income"},
            {"name": "Mortgage", "type": "expense"},
            {"name": "Groceries", "type": "expense"},
            {"name": "Utilities", "type": "expense"},
            {"name": "Entertainment", "type": "expense"},
            {"name": "Transportation", "type": "expense"},
            {"name": "Healthcare", "type": "expense"},
            {"name": "Savings", "type": "income"},
            {"name": "Investments", "type": "income"},
            {"name": "Miscellaneous", "type": "expense"},
        ]

        for cat in predefined_categories:
            Category.objects.update_or_create(
                name=cat["name"],
                defaults={"is_predefined": True, "type": cat["type"]},
            )

        self.stdout.write(self.style.SUCCESS('Predefined categories updated correctly!'))

