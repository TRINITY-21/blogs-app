# Generated by Django 3.2.14 on 2022-08-22 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pillars', '0004_rename_pillarspages_pillars'),
    ]

    operations = [
        migrations.AddField(
            model_name='pillarpages',
            name='show_dollars_bar',
            field=models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=10, null=True),
        ),
    ]