# Generated by Django 3.0.7 on 2020-06-06 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0003_auto_20200605_2229'),
    ]

    operations = [
        migrations.AddField(
            model_name='ratings',
            name='avg_rating',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
