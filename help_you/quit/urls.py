from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import *


# app_name = 'registration'
# add_user_router = DefaultRouter()
# add_user_router.register('register', RegisterUserView, basename='user-viewset')
# change_user_router.register('profile', ChangeUserViewSet, basename='profile-viewset')

urlpatterns = [
    path('api/register/', RegisterUserView.as_view()),
    path('api/habits/', BadHabitsListView.as_view()),
    path('api/profile/', ChangeUserView.as_view()),
    path('api/login/', obtain_auth_token)
]
# urlpatterns += [path(r'api/', include(add_user_router.urls))]
# urlpatterns += [path(r'api', include(change_user_router.urls))]
