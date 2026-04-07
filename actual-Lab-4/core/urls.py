from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Teacher URLs
    path('teachers/', views.teacher_list, name='teacher_list'),
    path('teachers/create/', views.teacher_create, name='teacher_create'),
    path('teachers/edit/<int:id>/', views.teacher_edit, name='teacher_edit'),
    path('teachers/delete/<int:id>/', views.teacher_delete, name='teacher_delete'),
    
    # Student URLs
    path('students/', views.student_list, name='student_list'),
    path('students/create/', views.student_create, name='student_create'),
    path('students/edit/<int:id>/', views.student_edit, name='student_edit'),
    path('students/delete/<int:id>/', views.student_delete, name='student_delete'),
]