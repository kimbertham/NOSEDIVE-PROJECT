# Generated by Django 3.0.7 on 2020-07-16 02:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_auto_20200716_0255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='post',
            name='updated_at',
            field=models.DateField(default=datetime.date.today),
        ),
    ]