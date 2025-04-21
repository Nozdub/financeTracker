from operator import itemgetter

from django.shortcuts import render
from .models import Income, Expense


# Create your views here.


def transaction_history(request):
    transactions = []  # List that holds transactions

    incomes = Income.objects.all()
    expenses = Expense.objects.all()

    for income in incomes:
        transactions.append({
            "id": income.id,
            "date": income.date,
            "type": "Income",
            "amount": income.amount,
            "description": income.description,
            "category": income.category.name,
            "running_total": 0
        })

    for expense in expenses:
        transactions.append({
            "id": expense.id,
            "date": expense.date,
            "type": "Expense",
            "amount": -abs(expense.amount),
            "description": expense.description,
            "category": expense.category.name,
            "running_total": 0
        })

    # ✅ STEP 1: Sort oldest → newest for running total
    transactions.sort(key=lambda tx: (tx["date"], tx["id"]))

    # ✅ STEP 2: Calculate running total in that order
    total = 0.0
    for tx in transactions:
        total += tx["amount"]
        tx["running_total"] = total

    # ✅ STEP 3: Sort newest → oldest for display
    transactions.sort(key=lambda tx: (tx["date"], tx["id"]), reverse=True)

    return render(request, 'finance/transaction_history.html', {
        'transactions': transactions
    })
