# Generated by Django 3.2.14 on 2022-08-17 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0020_auto_20220817_1452'),
    ]

    operations = [
        migrations.AddField(
            model_name='progressamount',
            name='show_progress_bar',
            field=models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=10, null=True),
        ),
    ]