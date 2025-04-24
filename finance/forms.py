from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms import DateInput, NumberInput

from .models import Expense, Income


class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ["date", "amount", "description", "category", "recurring", "frequency"]
        widgets = {
            "date": DateInput(attrs={"type": "date"}),
            "amount": NumberInput(attrs={"step": "0.01", "placeholder": "e.g. 123.45"}),
        }


class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ["date", "amount", "description", "category", "recurring", "frequency"]
        widgets = {
            "date": DateInput(attrs={"type": "date"}),
            "amount": NumberInput(attrs={"step": "0.01", "placeholder": "e.g. 123.45"}),
        }


class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


