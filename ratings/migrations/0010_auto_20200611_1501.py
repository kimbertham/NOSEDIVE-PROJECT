# Generated by Django 3.0.7 on 2020-06-11 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0009_auto_20200611_1415'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ratings',
            name='updated_at',
        ),
        migrations.AddField(
            model_name='ratings',
            name='feedback',
            field=models.CharField(blank=True, choices=[('Unattractive', 'Unattractive'), ('Rude Interaction', 'Rude Interaction'), ('Unpleasant Smell', 'Unpleasant Smell'), ('Impoverished Vibes', 'Impoverished Vibes'), ('Disciminatory', 'Disciminatory')], max_length=100),
        ),
    ]
