# Generated by Django 4.2.7 on 2023-11-17 21:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quit', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
    ]
