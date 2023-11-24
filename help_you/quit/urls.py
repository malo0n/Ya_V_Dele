from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *


app_name = 'registration'
add_user_router = DefaultRouter()
add_user_router.register('register', UserViewSet, basename='user-viewset')
# change_user_router.register('profile', ChangeUserViewSet, basename='profile-viewset')

urlpatterns = [
    path('api/login/', LoginUserView.as_view()),
    path('api/habits/', BadHabitsListView.as_view()),
    path('api/profile/<int:pk>', ChangeUserView.as_view()),
]
urlpatterns += [path(r'api/', include(add_user_router.urls))]
# urlpatterns += [path(r'api', include(change_user_router.urls))]
