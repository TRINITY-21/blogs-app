# Generated by Django 3.2.12 on 2022-08-02 15:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0004_auto_20220802_1542'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='author',
            options={'verbose_name': 'Story Author', 'verbose_name_plural': 'Story Authors'},
        ),
        migrations.AlterModelOptions(
            name='coauthor',
            options={'verbose_name': 'Story Co-Author', 'verbose_name_plural': 'Story Co-Authors'},
        ),
        migrations.AlterModelOptions(
            name='secondarytag',
            options={'verbose_name': 'Secondary Tags', 'verbose_name_plural': 'Secondary Tags'},
        ),
    ]