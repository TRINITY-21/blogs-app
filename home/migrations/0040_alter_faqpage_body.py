# Generated by Django 3.2.14 on 2022-08-28 21:36

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0039_alter_imagecta_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='faqpage',
            name='body',
            field=wagtail.core.fields.RichTextField(blank=True, null=True),
        ),
    ]