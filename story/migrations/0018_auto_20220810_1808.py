# Generated by Django 3.2.14 on 2022-08-10 18:08

from django.db import migrations
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0017_auto_20220810_1646'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storypage',
            name='from_address',
        ),
        migrations.RemoveField(
            model_name='storypage',
            name='subject',
        ),
        migrations.RemoveField(
            model_name='storypage',
            name='thank_you_text',
        ),
        migrations.RemoveField(
            model_name='storypage',
            name='to_address',
        ),
        migrations.AlterField(
            model_name='formfield',
            name='page',
            field=modelcluster.fields.ParentalKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='form_fields', to='story.contactpage'),
        ),
    ]