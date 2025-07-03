from django.contrib import admin
from .models import Income, Expense, Category, RecurringRule

# To start server: python manage.py runserver
# Register your models here.

admin.site.register(Income)
admin.site.register(Expense)
admin.site.register(Category)
admin.site.register(RecurringRule)
