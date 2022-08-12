# Generated by Django 3.2.14 on 2022-08-12 12:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0066_collection_management_permissions'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('story', '0018_auto_20220810_1808'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formfield',
            name='page',
        ),
        migrations.DeleteModel(
            name='ContactPage',
        ),
        migrations.DeleteModel(
            name='FormField',
        ),
    ]