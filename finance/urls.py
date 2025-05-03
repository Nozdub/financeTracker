from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.home, name="home"),
    path('transactions/', views.transaction_history, name='transaction_history'),
    path('login/', auth_views.LoginView.as_view(template_name='finance/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('add-expense/', views.add_expense, name='add_expense'),
    path('add-income/', views.add_income, name='add_income'),
    path("categories/", views.manage_categories, name="manage_categories"),
    path("delete-category/<int:category_id>/", views.delete_category, name="delete_category"),



]