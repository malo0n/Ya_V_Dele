from datetime import datetime

from rest_framework import serializers
from django.contrib.auth import get_user_model


USER = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(default=datetime.now())

    class Meta:
        model = USER
        exclude = ('id', 'is_superuser', 'first_name', 'last_name', 
                  'email', 'is_staff', 'is_active', 'date_joined')
