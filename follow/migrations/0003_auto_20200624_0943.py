# Generated by Django 3.0.7 on 2020-06-24 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('follow', '0002_auto_20200610_1516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='created',
            field=models.DateField(auto_now_add=True, db_index=True),
        ),
    ]