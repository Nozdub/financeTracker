from django.core.management.base import BaseCommand
from finance.models import Category


class Command(BaseCommand):
    help = 'Seeds predefined categories'

    def handle(self, *args, **kwargs):
        predefined_categories = [
            "Salary",
            "Mortgage",
            "Groceries",
            "Utilities",
            "Entertainment",
            "Transportation",
            "Healthcare",
            "Savings",
            "Investments",
            "Miscellaneous",
        ]

        for name in predefined_categories:
            Category.objects.get_or_create(name=name, defaults={"is_predefined": True})

        self.stdout.write(self.style.SUCCESS('Predefined categories created or already exist!'))

