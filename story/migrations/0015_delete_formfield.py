# Generated by Django 3.2.14 on 2022-08-09 16:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0014_alter_formfield_page'),
    ]

    operations = [
        migrations.DeleteModel(
            name='FormField',
        ),
    ]