# Generated by Django 3.0.7 on 2020-10-08 18:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0003_messaging_read'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='messaging',
            options={'ordering': ('-created_at',)},
        ),
    ]