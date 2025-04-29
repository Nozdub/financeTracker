from operator import itemgetter

from .models import Income, Expense
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .forms import RegisterForm, IncomeForm
from .forms import ExpenseForm
from django.utils.timezone import now, make_aware, get_current_timezone
from datetime import timedelta, time
from django.db.models import Value, CharField, F, ExpressionWrapper, FloatField, Sum

from .utils import calculate_balance
import json


# Create your views here.


@login_required()
def transaction_history(request):
    transactions = []
    now_time = now()

    # Force timezone-aware comparisons
    incomes = Income.objects.filter(user=request.user, date__lte=now_time)
    expenses = Expense.objects.filter(user=request.user, date__lte=now_time)

    upcoming_expenses = Expense.objects.filter(
        user=request.user,
        date__gt=now_time,
        date__lte=now_time + timedelta(days=7),
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

    # STEP 1: Sort oldest → newest for running total
    transactions.sort(key=lambda tx: (tx["date"], tx["id"]))

    # STEP 2: Calculate running total in that order
    total = 0.0
    for tx in transactions:
        total += tx["amount"]
        tx["running_total"] = total

    # STEP 3: Sort newest → oldest for display
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

    return render(request, "finance/register.html", {"form": form})


def add_expense(request):
    if request.method == "POST":
        form = ExpenseForm(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            if expense.date.time() == time(0, 0):
                expense.date = make_aware(
                    now().replace(
                        year=expense.date.year,
                        month=expense.date.month,
                        day=expense.date.day
                    )
                )
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
            if income.date.time() == time(0, 0):
                income.date = make_aware(
                    now().replace(
                        year=income.date.year,
                        month=income.date.month,
                        day=income.date.day
                    )
                )
            income.user = request.user
            income.save()
            return redirect("transaction_history")
    else:
        form = IncomeForm()

    return render(request, "finance/add_income.html", {"form": form})


@login_required
def home(request):
    displayed_balance = calculate_balance(request.user)

    expenses = Expense.objects.filter(user=request.user).annotate(
        type=Value('Expense', output_field=CharField()),
        adjusted_amount=ExpressionWrapper(F('amount') * -1, output_field=FloatField())
    ).values('id', 'date', 'adjusted_amount', 'description', 'category__name', 'type')

    incomes = Income.objects.filter(user=request.user).annotate(
        type=Value('Income', output_field=CharField()),
        adjusted_amount=F('amount')
    ).values('id', 'date', 'adjusted_amount', 'description', 'category__name', 'type')

    transactions = incomes.union(expenses).order_by('-date')[:5]

    category_totals = Expense.objects.filter(user=request.user, category__type="expense"
                                             ).values('category__name').annotate(total=Sum('amount')
                                                                                 ).order_by('total')

    category_labels = [item['category__name'] for item in category_totals]
    category_data = [item['total'] for item in category_totals]

    # Serialize before sending to frontend
    category_labels = json.dumps(category_labels)
    category_data = json.dumps(category_data)

    return render(request, "finance/home.html", {
        "displayed_balance": displayed_balance,
        "recent_transactions": transactions,
        "category_labels": category_labels,
        "category_data": category_data,
    })
