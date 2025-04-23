import pytest
from datetime import date
from unittest.mock import patch
from django.contrib.auth.models import User
from finance.models import Category, RecurringRule, Expense
from finance.utils import process_recurring_rules
from django.utils.timezone import make_aware
from datetime import datetime


@patch('finance.utils.now')
@pytest.mark.django_db
def test_recurring_rule_creates_expenses_on_15th(mock_now):
    # 1. simulate today as april 15, 2025
    fake_date = make_aware(datetime(2025, 4, 15))
    mock_now.return_value = fake_date

    # 2. setup required data
    user = User.objects.create_user(username='testuser', password='testpass')
    category = Category.objects.create(name='TestCategory')

    # 3. Create recurring rule
    rule = RecurringRule.objects.create(
        start_date=fake_date,
        end_date=None,
        frequency='monthly',
        type='expense',
        description='Test Expense',
        amount=42.0,
        category=category,
        user=user
    )

    # 4. Run the function
    process_recurring_rules()

    # 5. Assert an Expense was acreated
    expenses = Expense.objects.filter(user=user, description='Test Expense')

    assert expenses.count() == 1
    assert expenses.first().amount == 42
    assert expenses.first().category == category
