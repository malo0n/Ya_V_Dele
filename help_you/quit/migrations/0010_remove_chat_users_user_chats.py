# Generated by Django 4.2.7 on 2023-12-03 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quit', '0009_remove_user_chats_chat_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='users',
        ),
        migrations.AddField(
            model_name='user',
            name='chats',
            field=models.ManyToManyField(blank=True, to='quit.chat', verbose_name='Чаты'),
        ),
    ]
