from datetime import datetime

from rest_framework import serializers, status
from rest_framework.response import Response
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
                   'date_joined', 'password')
    
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
        bad_habits_data = data.get('bad_habits', [])
        internal_value = {
            'bad_habits': [{str('title'): habit[str('title')]} for habit in bad_habits_data]
        }
        return super().to_internal_value(internal_value)
    

    def update(self, instance, validated_data):
        instance.bad_habits.clear()
        bad_habits = validated_data.get('bad_habits', [])
        for bad_habit in bad_habits:
            habit_title = bad_habit.get('title')
            try:
                habit = BadHabits.objects.get(title=habit_title)
                instance.bad_habits.add(habit)
            except BadHabits.DoesNotExist:
                raise serializers.ValidationError(f"Нет такой привычки {habit_title}")

        instance.save()

        return instance