import json
from datetime import timedelta, time, datetime, timezone, date

from django.contrib.auth.decorators import login_required
from django.db.models import Value, CharField, F, ExpressionWrapper, FloatField, Sum
from django.shortcuts import redirect, render
from django.utils.timezone import now

from .forms import ExpenseForm
from .forms import RegisterForm, IncomeForm
from .models import Income, Expense
from .utils import calculate_balance, get_next_due_date


# Create your views here.


@login_required()
def transaction_history(request):
    transactions = []
    today = date.today()

    expenses = Expense.objects.filter(user=request.user, date__date__lte=today)
    incomes = Income.objects.filter(user=request.user, date__date__lte=today)

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

    # Upcoming recurring expenses handling
    upcoming_expenses = []
    future_recurring = Expense.objects.filter(user=request.user, recurring=True)

    for expense in future_recurring:
        next_due = get_next_due_date(expense.date, expense.frequency)

        if today < next_due <= (today + timedelta(days=7)):
            upcoming_expenses.append({
                "id": expense.id,
                "date": next_due,
                "type": "Expense",
                "amount": -abs(expense.amount),
                "description": expense.description,
                "category": expense.category.name,
            })

    # Sort and calculate running total
    transactions.sort(key=lambda tx: (tx["date"], tx["id"]))
    total = 0.0
    for tx in transactions:
        total += tx["amount"]
        tx["running_total"] = total
    transactions.sort(key=lambda tx: (tx["date"], tx["id"]), reverse=True)

    return render(request, 'finance/transaction_history.html', {
        'transactions': transactions,
        'upcoming_expenses': upcoming_expenses,
    })


def add_transaction(request, form_class, template_name, redirect_name):
    if request.method == "POST":
        form = form_class(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            if instance.date.time() == time(0, 0):
                current_time = now().time()
                instance.date = instance.date.replace(
                    hour=current_time.hour,
                    minute=current_time.minute,
                    second=current_time.second,
                    microsecond=current_time.microsecond
                )
            instance.user = request.user
            instance.save()
            return redirect(redirect_name)
    else:
        form = form_class()
    return render(request, template_name, {"form": form})


def add_income(request):
    return add_transaction(request, IncomeForm, "finance/add_income.html", "transaction_history")


def add_expense(request):
    return add_transaction(request, ExpenseForm, "finance/add_expense.html", "transaction_history")


def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")  # Sends user to login view after registering user.
    else:
        form = RegisterForm()

    return render(request, "finance/register.html", {"form": form})


@login_required
def home(request):
    displayed_balance = calculate_balance(request.user)
    today = date.today()

    expenses = Expense.objects.filter(user=request.user, date__date__lte=today).annotate(
        type=Value('Expense', output_field=CharField()),
        adjusted_amount=ExpressionWrapper(F('amount') * -1, output_field=FloatField())
    ).values('id', 'date', 'adjusted_amount', 'description', 'category__name', 'type')

    incomes = Income.objects.filter(user=request.user, date__date__lte=today).annotate(
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
