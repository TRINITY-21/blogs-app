# Generated by Django 3.2.14 on 2022-08-19 16:33

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('wagtailcore', '0066_collection_management_permissions'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('pillars', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PillarsPages',
            new_name='Pillars',
        ),
    ]