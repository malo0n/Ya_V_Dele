from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *


app_name = 'registration'
router = DefaultRouter()
router.register('register', UserViewSet, basename='user-viewset')

urlpatterns = [
    path('api/login/', LoginUserView.as_view(), name='login')
]
urlpatterns += [path(r'api/', include(router.urls))]
