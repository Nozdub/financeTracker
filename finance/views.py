import json
from datetime import timedelta, time, datetime, timezone, date

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Value, CharField, F, ExpressionWrapper, FloatField, Sum
from django.shortcuts import redirect, render, get_object_or_404
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt

from .forms import ExpenseForm, CategoryForm
from .forms import RegisterForm, IncomeForm
from .models import Income, Expense, Category
from .utils import calculate_balance, get_next_due_date
from django.http import FileResponse, JsonResponse
from django.conf import settings
import os


# Create your views here.

def react_app(request):
    index_path = os.path.join(settings.BASE_DIR, 'static', 'index.html')
    return FileResponse(open(index_path, 'rb'))


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


@csrf_exempt
def transaction_list(request):
    if request.method == 'GET':
        expenses = Expense.objects.all().values('date', 'description', 'amount', 'recurring')
        incomes = Income.objects.all().values('date', 'description', 'amount', 'recurring')

        transactions = [
            {**e, 'type': 'Expense'} for e in expenses
        ] + [
            {**i, 'type': 'Income'} for i in incomes
        ]

        # Sort and add balanceAfter (running total)
        transactions.sort(key=lambda x: x['date'])
        total = 0.0
        for tx in transactions:
            total += tx['amount'] if tx['type'] == 'Income' else -abs(tx['amount'])
            tx['balanceAfter'] = total
        transactions.reverse()
        return JsonResponse(transactions, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            t_type = data.get('type')
            date = data.get('date')
            amount = float(data.get('amount', 0))
            description = data.get('description', '')
            recurring = data.get('recurring', False)

            user = request.user if request.user.is_authenticated else User.objects.first()
            default_category = Category.objects.filter(type=t_type.lower()).first()

            if not default_category:
                return JsonResponse({'error': 'No default category found'}, status=400)

            if t_type == 'Income':
                Income.objects.create(user=user, date=date, amount=amount, description=description,
                                      category=default_category, recurring=recurring)
            elif t_type == 'Expense':
                Expense.objects.create(user=user, date=date, amount=amount, description=description,
                                       category=default_category, recurring=recurring)
            else:
                return JsonResponse({'error': 'Invalid transaction type'}, status=400)

            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid method'}, status=405)




@csrf_exempt
def get_balance(request):
    user = request.user if request.user.is_authenticated else User.objects.first()
    balance = calculate_balance(user)
    return JsonResponse({"balance": balance})


@csrf_exempt
def get_summary(request):
    user = request.user if request.user.is_authenticated else User.objects.first()

    # Line Chart: Monthly income vs expense
    monthly = []
    for month in range(1, 13):
        income = Income.objects.filter(user=user, date__month=month).aggregate(Sum("amount"))["amount__sum"] or 0
        expense = Expense.objects.filter(user=user, date__month=month).aggregate(Sum("amount"))["amount__sum"] or 0
        monthly.append({ "month": month, "income": income, "expense": expense })

    # Pie Chart: Expenses by category
    pie_data = Expense.objects.filter(user=user).values('category__name').annotate(total=Sum('amount')).order_by('-total')
    categories = [{"category": p["category__name"], "amount": p["total"]} for p in pie_data]

    return JsonResponse({ "monthly": monthly, "categories": categories })