from datetime import datetime

from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import BadHabits


USER = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(default=datetime.now())
    date_joined = serializers.DateTimeField(default=datetime.now())

    class Meta:
        model = USER
        exclude = ('id', 'is_superuser', 'first_name', 'last_name', 
                  'email', 'is_staff', 'is_active')

    def create(self, validated_data):
        user = USER.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user  


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('username', 'password')


class BadHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BadHabits
        fields = ('title', )
