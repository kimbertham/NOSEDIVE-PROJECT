# Generated by Django 3.0.7 on 2020-06-11 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0004_auto_20200611_2350'),
    ]

    operations = [
        migrations.AddField(
            model_name='forum',
            name='description',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]