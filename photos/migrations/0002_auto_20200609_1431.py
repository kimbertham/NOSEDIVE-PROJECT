# Generated by Django 3.0.7 on 2020-06-09 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photos',
            old_name='content',
            new_name='image',
        ),
    ]