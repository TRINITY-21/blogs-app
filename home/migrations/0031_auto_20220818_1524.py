# Generated by Django 3.2.14 on 2022-08-18 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0030_auto_20220818_1150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pillarpage',
            name='dollars_raised',
            field=models.CharField(blank=True, default=0, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='pillarpage',
            name='percent_to_goal',
            field=models.CharField(blank=True, default=0, max_length=100, null=True),
        ),
    ]