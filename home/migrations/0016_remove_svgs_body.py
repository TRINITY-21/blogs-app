# Generated by Django 3.2.14 on 2022-08-15 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_auto_20220815_1612'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='svgs',
            name='body',
        ),
    ]
