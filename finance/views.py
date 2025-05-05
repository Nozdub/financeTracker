import json
from datetime import timedelta, time, datetime, timezone, date

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Value, CharField, F, ExpressionWrapper, FloatField, Sum
from django.shortcuts import redirect, render, get_object_or_404
from django.utils.timezone import now

from .forms import ExpenseForm, CategoryForm
from .forms import RegisterForm, IncomeForm
from .models import Income, Expense, Category
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


def edit_income(request, income_id):
    income = get_object_or_404(Income, id=income_id, user=request.user)
    if request.method == "POST":
        form = IncomeForm(request.POST, instance=income)
        if form.is_valid():
            update_income = form.save(commit=False)
            update_income.user = request.user
            update_income.save()
            return redirect("transaction_history")
    else:
        form = IncomeForm(instance=income)

    return render(request, "finance/edit_income.html", {"form": form, "income": income})


def add_expense(request):
    return add_transaction(request, ExpenseForm, "finance/add_expense.html", "transaction_history")


def edit_expense(request, expense_id):
    expense = get_object_or_404(Expense, id=expense_id, user=request.user)
    if request.method == "POST":
        form = ExpenseForm(request.POST, instance=expense)
        if form.is_valid():
            update_expense = form.save(commit=False)
            update_expense.user = request.user
            update_expense.save()
            return redirect("transaction_history")
    else:
        form = ExpenseForm(instance=expense)

    return render(request, "finance/edit_expense.html", {"form": form, "expense": expense})


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

    # Recent 5 transactions (income + expenses)
    expenses = Expense.objects.filter(user=request.user, date__date__lte=today).annotate(
        type=Value('Expense', output_field=CharField()),
        adjusted_amount=ExpressionWrapper(F('amount') * -1, output_field=FloatField())
    ).values('id', 'date', 'adjusted_amount', 'description', 'category__name', 'type')

    incomes = Income.objects.filter(user=request.user, date__date__lte=today).annotate(
        type=Value('Income', output_field=CharField()),
        adjusted_amount=F('amount')
    ).values('id', 'date', 'adjusted_amount', 'description', 'category__name', 'type')

    transactions = incomes.union(expenses).order_by('-date')[:5]

    # Pie chart: spending per category
    category_totals = Expense.objects.filter(user=request.user, category__type="expense"
                                             ).values('category__name'
                                                      ).annotate(total=Sum('amount')
                                                                 ).order_by('-total')

    category_labels = [item['category__name'] for item in category_totals]
    category_data = [item['total'] for item in category_totals]

    # Assign consistent colors to categories
    base_colors = [
        'rgba(255, 99, 132, 0.7)',  # red
        'rgba(54, 162, 235, 0.7)',  # blue
        'rgba(255, 206, 86, 0.7)',  # yellow
        'rgba(75, 192, 192, 0.7)',  # teal
        'rgba(153, 102, 255, 0.7)',  # purple
        'rgba(255, 159, 64, 0.7)',  # orange
        'rgba(100, 100, 255, 0.7)',  # custom blue
        'rgba(200, 200, 0, 0.7)',  # custom yellow
    ]
    category_colors = base_colors[:len(category_labels)]
    category_legend = zip(category_labels, category_colors)

    # Bar chart: expenses by day (past 7 days)
    last_week = today - timedelta(days=6)
    daily_expenses = Expense.objects.filter(user=request.user, date__date__gte=last_week
                    ).annotate(day=F('date__date')
                    ).values('day'
                    ).annotate(total=Sum('amount')
                    ).order_by('day')

    bar_labels = []
    bar_data = []
    for i in range(7):
        current_day = last_week + timedelta(days=i)
        bar_labels.append(current_day.strftime("%Y-%m-%d"))
        day_data = next((item['total'] for item in daily_expenses if item['day'] == current_day), 0)
        bar_data.append(float(day_data))

    # Line chart: income vs expense per day (last 7 days)
    line_labels = [(today - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(6, -1, -1)]
    line_income_data = []
    line_expense_data = []

    for label in line_labels:
        date_obj = datetime.strptime(label, "%Y-%m-%d").date()
        day_income = Income.objects.filter(user=request.user, date__date=date_obj).aggregate(total=Sum('amount'))[
                         'total'] or 0
        day_expense = Expense.objects.filter(user=request.user, date__date=date_obj).aggregate(total=Sum('amount'))[
                          'total'] or 0
        line_income_data.append(day_income)
        line_expense_data.append(day_expense)

    top3_labels = category_labels[:3]
    top3_data = category_data[:3]

    return render(request, "finance/home.html", {
        "displayed_balance": displayed_balance,
        "recent_transactions": transactions,
        "category_labels": json.dumps(category_labels),
        "category_data": json.dumps(category_data),
        "category_colors": json.dumps(category_colors),
        "category_legend": category_legend,  # 👈 used for HTML labels
        "bar_labels": json.dumps(bar_labels),
        "bar_data": json.dumps(bar_data),
        "line_labels": json.dumps(line_labels),
        "line_income_data": json.dumps(line_income_data),
        "line_expense_data": json.dumps(line_expense_data),
        "top3_labels": json.dumps(top3_labels),
        "top3_data": json.dumps(top3_data),
        "current_month_year": today.strftime("%B %Y")
    })

@login_required
def manage_categories(request):
    user_categories = Category.objects.filter(is_predefined=False)

    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            new_category = form.save(commit=False)
            new_category.is_predefined = False
            new_category.save()
            return redirect('manage_categories')
    else:
        form = CategoryForm

    return render(request, "finance/manage_categories.html", {
        "form": form,
        "user_categories": user_categories
    })


@login_required
def delete_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)

    if not category.is_predefined:
        category.delete()

    return redirect("manage_categories")


