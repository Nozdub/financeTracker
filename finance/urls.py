from django.urls import path
from . import views

urlpatterns = [
    path('transaction/', views.transaction_history, name='transaction_history'),
]