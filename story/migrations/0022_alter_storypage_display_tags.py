# Generated by Django 3.2.14 on 2022-08-22 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('story', '0021_alter_storypage_display_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storypage',
            name='display_tags',
            field=models.CharField(blank=True, choices=[('Recent Gifts & Milestones', 'Recent Gifts & Milestones'), ('Undergrad Scholarships', 'Undergrad Scholarships'), ('fellowships', 'Graduate Fellowships'), ('Health & Wellness', 'Health & Wellness'), ('Career Advising', 'Career Advising'), ('Co-Curricular Experience', 'Co-Curricular Experience')], max_length=100, null=True),
        ),
    ]
