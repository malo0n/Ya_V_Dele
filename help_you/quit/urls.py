from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import *


urlpatterns = [
    path('api/register/', RegisterUserView.as_view()),
    path('api/habits/', BadHabitsListView.as_view()),
    path('api/profile/', ChangeUserView.as_view()),
    path('api/login/', obtain_auth_token)
]

