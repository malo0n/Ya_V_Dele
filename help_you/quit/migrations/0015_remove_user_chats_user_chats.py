# Generated by Django 4.2.7 on 2023-12-09 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quit', '0014_alter_message_chat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='chats',
        ),
        migrations.AddField(
            model_name='user',
            name='chats',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quit.chat', verbose_name='Чаты'),
        ),
    ]
