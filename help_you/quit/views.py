from django.shortcuts import render
from django.contrib.auth import get_user_model, authenticate
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer


USER = get_user_model()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = USER.objects.all()


def registration(request):
    return render(request, 'registration.html')