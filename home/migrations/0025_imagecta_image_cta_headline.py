# Generated by Django 3.2.14 on 2022-08-18 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0024_rename_stats_statssvg'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagecta',
            name='image_cta_headline',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]