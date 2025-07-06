from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.react_app, name="home"),
    path('transactions/', views.transaction_history, name='transaction_history'),
    path('login/', auth_views.LoginView.as_view(template_name='finance/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('add-expense/', views.add_expense, name='add_expense'),
    path('add-income/', views.add_income, name='add_income'),
    path("categories/", views.manage_categories, name="manage_categories"),
    path("delete-category/<int:category_id>/", views.delete_category, name="delete_category"),
    path('edit-expense/<int:expense_id>/', views.edit_expense, name='edit_expense'),
    path('edit-income/<int:income_id>/', views.edit_income, name='edit_income'),
]
