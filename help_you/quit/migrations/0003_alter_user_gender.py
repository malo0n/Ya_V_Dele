# Generated by Django 4.2.7 on 2023-11-17 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quit', '0002_alter_user_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, choices=[('W', 'Женщина'), ('M', 'Мужчина')], default=None, max_length=10, null=True, verbose_name='Пол'),
        ),
    ]
