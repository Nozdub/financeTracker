from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20)  # income or expense

    def __str__(self):
        return f"{self.name} ({self.type})"


class Income(models.Model):
    date = models.DateTimeField()
    amount = models.FloatField()
    description = models.CharField(max_length=25)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    recurring = models.BooleanField(default=False)
    frequency = models.CharField(max_length=20, blank=True, null= True)

    def __str__(self):
        return f"{self.amount} on {self.date.strftime('%Y-%m-%d')}"


class Expense(models.Model):
    date = models.DateTimeField()
    amount = models.FloatField()
    description = models.CharField(max_length=25)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    recurring = models.BooleanField(default=False)
    frequency = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.amount} on {self.date.strftime('%Y-%m-%d')}"


class RecurringRule(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    frequency = models.CharField(max_length=20, blank=True, null=True)
    type = models.CharField(max_length=25)
    description = models.CharField(max_length=25)
    amount = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.amount}, {self.type} starting {self.start_date.strftime('%Y-%m-%d')}"

