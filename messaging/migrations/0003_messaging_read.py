# Generated by Django 3.0.7 on 2020-07-30 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0002_messaging_conversation'),
    ]

    operations = [
        migrations.AddField(
            model_name='messaging',
            name='read',
            field=models.BooleanField(default=False),
        ),
    ]