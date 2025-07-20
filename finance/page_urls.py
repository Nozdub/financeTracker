from django.urls import path, re_path
from django.contrib.auth import views as auth_views
from .views import register, manage_categories, delete_category, react_app

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='finance/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', register, name='register'),
    path('categories/', manage_categories, name='manage_categories'),
    path('delete-category/<int:category_id>/', delete_category, name='delete_category'),

    # 🔁 Catch-all fallback to React
    re_path(r'^(?!admin|api|static|media).*$' , react_app),
]
