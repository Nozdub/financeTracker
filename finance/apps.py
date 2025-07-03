from django.apps import AppConfig
from django.db.utils import OperationalError


class FinanceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'finance'

    def ready(self):
        try:
            from finance.models import Category  # Move import HERE inside ready()
            if not Category.objects.exists():
                from finance.management.commands.seed_categories import Command
                Command().handle()
        except OperationalError:
            # Might happen if migrations haven't been run yet
            pass
