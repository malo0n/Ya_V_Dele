from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *


app_name = 'registration'
router = DefaultRouter()
router.register('register', UserViewSet, basename='user-viewset')

urlpatterns = [
    path('api/login/', LoginUserView.as_view()),
    path('api/habits/', BadHabitsListView.as_view()),
]
urlpatterns += [path(r'api/', include(router.urls))]
