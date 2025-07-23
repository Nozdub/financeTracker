from django.urls import path
from .views import transaction_list, get_balance, get_summary, delete_transaction

urlpatterns = [
    path('transactions/', transaction_list, name='transaction_list'),
    path('balance/', get_balance, name='get_balance'),
    path('delete_transaction/', delete_transaction, name='delete_transaction'),
    path('summary/', get_summary, name='get_summary'),
]
