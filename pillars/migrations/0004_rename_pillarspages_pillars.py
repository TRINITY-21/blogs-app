# Generated by Django 3.2.14 on 2022-08-19 16:59

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0066_collection_management_permissions'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('pillars', '0003_rename_pillars_pillarspages'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PillarsPages',
            new_name='Pillars',
        ),
    ]
