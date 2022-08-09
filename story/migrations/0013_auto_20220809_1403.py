# Generated by Django 3.2.14 on 2022-08-09 14:03

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0012_remove_storypage_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='formfield',
            name='field_classname',
            field=models.CharField(blank=True, max_length=254, verbose_name='Field classes'),
        ),
        migrations.AddField(
            model_name='formfield',
            name='placeholder',
            field=models.CharField(blank=True, max_length=254, verbose_name='Placeholder'),
        ),
        migrations.AlterField(
            model_name='formfield',
            name='page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='custom_form_field', to='story.storypage'),
        ),
    ]
