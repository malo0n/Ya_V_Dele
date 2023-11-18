from django.db import models
from django.contrib.auth.models import AbstractUser


class BadHabits(models.Model):
    title = models.CharField(max_length=50, verbose_name="Привычка")

    class Meta:
        verbose_name = "Вредная привычка"
        verbose_name_plural = "Вредные привычки"

    def __str__(self):
        return f"{self.title}"


class User(AbstractUser):
    gender_choice = [
        ("W", "Женщина"),
        ("M", "Мужчина")
    ]

    name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Имя")
    gender = models.CharField(max_length=10, choices=gender_choice, null=True, blank=True, default=None, verbose_name="Пол")
    date_of_birth = models.DateField(null=True, blank=True, verbose_name="Дата рождения")
    about_me = models.TextField(null=True, blank=True, verbose_name="Обо мне")
    photo = models.FileField(null=True, blank=True, verbose_name="Фото")
    bad_habits = models.ManyToManyField(BadHabits, blank=True, verbose_name="Плохие привычки")

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
