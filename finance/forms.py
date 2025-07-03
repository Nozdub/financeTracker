from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from .models import Expense, Income, Category


class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ["date", "amount", "description", "category", "recurring", "frequency"]
        widgets = {
            "date": forms.DateTimeInput(attrs={"type": "datetime-local"})
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].queryset = Category.objects.filter(type="expense")


class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ["date", "amount", "description", "category", "recurring", "frequency"]
        widgets = {
            "date": forms.DateTimeInput(attrs={"type": "datetime-local"})
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].queryset = Category.objects.filter(type="income")


class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'type']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'e.g. Books'}),
            'type': forms.Select(choices=[('income', 'Income'), ('expense', 'Expense')]),
        }

    def __init__(self,  *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['type'].label = "Category Type"

