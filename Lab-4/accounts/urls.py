from django.urls import path
from . import views

urlpatterns = [
    path("", views.AccountsHomePage.as_view(), name="accounts_home_page"),
]