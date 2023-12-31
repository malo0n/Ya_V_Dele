# Generated by Django 4.2.7 on 2023-12-03 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quit', '0007_alter_user_bad_habits'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='Сообщение')),
                ('departure_time', models.DateTimeField(auto_now_add=True, verbose_name='Время отправления')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Отправитель')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
            },
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('messages', models.ManyToManyField(blank=True, to='quit.message', verbose_name='Сообщения')),
            ],
            options={
                'verbose_name': 'Чат',
                'verbose_name_plural': 'Чаты',
            },
        ),
        migrations.AddField(
            model_name='user',
            name='chats',
            field=models.ManyToManyField(blank=True, to='quit.chat', verbose_name='Чаты'),
        ),
    ]
