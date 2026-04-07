from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('products/<int:id>/', views.product_detail, name='product_detail'),
    path('products/<int:id>/stock/', views.update_stock, name='update_stock'),
    path('dashboard/', views.dashboard_stats, name='dashboard'),
]