import json

from datetime import datetime

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone

from .models import Chat, BadHabits, Message


USER = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(default=timezone.now())

    class Meta:
        model = USER
        exclude = ('id', 'is_superuser', 'first_name', 'last_name', 
                  'email', 'is_staff', 'is_active', 'groups',
                  'user_permissions', 'chats')

    def create(self, validated_data):
        user = USER.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user  


class BadHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BadHabits
        fields = ('title', 'id')


class ChangeUserSerializer(serializers.ModelSerializer):
    bad_habits = BadHabitsSerializer(many=True)

    class Meta:
        model = USER
        exclude = ('id', 'is_superuser', 'first_name', 'last_name', 
                   'email', 'is_staff', 'is_active', 'last_login',
                   'date_joined', 'password', 'groups', 'user_permissions',
                   'chats')
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['bad_habits'] = [
            {
                str('id'): item['id'], 
                str('title'): item['title']
            } 
            for item in representation['bad_habits']
        ]
        return representation
    
    
    def to_internal_value(self, data):
        bad_habits_data = json.loads(data.get('bad_habits', []))
        internal_value = super().to_internal_value(data)
        internal_value['bad_habits'] = [
            {'title': habit['title']} for habit in bad_habits_data
            ]
        return internal_value
    

    def update(self, instance, validated_data):
        bad_habits = validated_data.get('bad_habits', [])
        validated_data['bad_habits'] = ()
        instance = super().update(instance, validated_data)
        for bad_habit in bad_habits:
            habit_title = bad_habit.get('title')
            try:
                habit = BadHabits.objects.get(title=habit_title)
                instance.bad_habits.add(habit)
            except BadHabits.DoesNotExist:
                raise serializers.ValidationError(f"Нет такой привычки {habit_title}")
            except:
                raise serializers.ValidationError("Непредвиденная ошибка")
        instance.save()
        return instance
    

class UsersChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('id', 'name', 'chats')


class CreateUsersChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('id', 'name')


class MessagesSerialiser(serializers.ModelSerializer):
    departure_time = serializers.DateTimeField(default=timezone.now())
    class Meta:
        model = Message
        fields = '__all__'


class LastMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('departure_time', 'content')


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('name', 'id')


        
