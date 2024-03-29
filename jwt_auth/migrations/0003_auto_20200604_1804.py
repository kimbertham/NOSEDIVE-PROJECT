# Generated by Django 3.0.7 on 2020-06-04 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_user_hey'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='Hey',
        ),
        migrations.AddField(
            model_name='user',
            name='Birthday',
            field=models.IntegerField(blank=True, default=1, max_length=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, choices=[('Single', 'Single'), ('Relationship', 'In a Realtionship'), ('Complicated', 'Complicated'), ('Widowed', 'Widowed'), ('Engaged', 'Engaged')], max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='Location',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='career',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='description',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(blank=True, max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
