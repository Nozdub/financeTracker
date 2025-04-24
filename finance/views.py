from operator import itemgetter

from .models import Income, Expense
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .forms import RegisterForm, IncomeForm
from .forms import ExpenseForm
from django.utils.timezone import now
from datetime import timedelta


# Create your views here.


@login_required()
def transaction_history(request):
    transactions = []  # List that holds transactions
    today = now()

    incomes = Income.objects.filter(date__lte=today)
    expenses = Expense.objects.filter(date__lte=today)

    upcoming_expenses = Expense.objects.filter(
        date__gt=today,
        date__lte=today + timedelta(days=7),
        recurring=True
    ).order_by("date")

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
        'transactions': transactions,
        'upcoming_expenses': upcoming_expenses
    })


def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")  # Sends user to login view after registering user.
    else:
        form = RegisterForm()

    return render(request, "finance/register.html",  {"form": form})


def add_expense(request):
    if request.method == "POST":
        form = ExpenseForm(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.user = request.user
            expense.save()
            return redirect("transaction_history")
    else:
        form = ExpenseForm()

    return render(request, "finance/add_expense.html", {"form": form})


def add_income(request):
    if request.method == "POST":
        form = IncomeForm(request.POST)
        if form.is_valid():
            income = form.save(commit=False)
            income.user = request.user
            income.save()
            return redirect("transaction_history")
    else:
        form = IncomeForm()

    return render(request, "finance/add_income.html", {"form": form})


@login_required
def home(request):
    return render(request, "finance/home.html")