from operator import itemgetter

from django.shortcuts import render
from .models import Income, Expense


# Create your views here.


def transaction_history(request):
    transactions = []  # List that holds transactions

    incomes = Income.objects.all()
    expenses = Expense.objects.all()

    for income in incomes:
        income_dict = {
            "date": income.date,
            "type": "Income",
            "amount": income.amount,
            "description": income.description,
            "category": income.category.name,
            "running_total": 0
        }
        transactions.append(income_dict)

    for expense in expenses:
        expense_dict = {
            "date": expense.date,
            "type": "Expense",
            "amount": -abs(expense.amount),
            "description": expense.description,
            "category": expense.category.name,
            "running_total": 0
        }
        transactions.append(expense_dict)

    transactions.sort(key=itemgetter("date"), reverse=True)

    total = 0.0
#  must fix timestamp issue
    for i in transactions:
        total += i["amount"]
        i["running_total"] = total

    return render(request, 'finance/transaction_history.html', {
        'transactions': transactions
    })
