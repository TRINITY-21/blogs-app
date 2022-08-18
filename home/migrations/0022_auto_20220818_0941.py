# Generated by Django 3.2.14 on 2022-08-18 09:41

from django.conf import settings
from django.db import migrations, models
import story.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('wagtailcore', '0066_collection_management_permissions'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('home', '0021_progressamount_show_progress_bar'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ShortStory',
            new_name='ImageCTA',
        ),
        migrations.RenameModel(
            old_name='CTACards',
            new_name='Stats',
        ),
        migrations.AddField(
            model_name='svgs',
            name='stats_copy',
            field=wagtail.core.fields.StreamField([('h1', wagtail.core.blocks.CharBlock()), ('h2', wagtail.core.blocks.CharBlock()), ('paragraph', wagtail.core.blocks.RichTextBlock()), ('image_text', wagtail.core.blocks.StructBlock([('reverse', wagtail.core.blocks.BooleanBlock(required=False)), ('text', wagtail.core.blocks.RichTextBlock()), ('image', story.blocks.CustomImageChooserBlock(rendition='width-800'))])), ('image_carousel', wagtail.core.blocks.ListBlock(story.blocks.CustomImageChooserBlock())), ('thumbnail_gallery', wagtail.core.blocks.ListBlock(story.blocks.CustomImageChooserBlock()))], blank=True, null=True),
        ),
        migrations.AddField(
            model_name='svgs',
            name='stats_cta',
            field=wagtail.core.fields.StreamField([('cta', wagtail.core.blocks.StructBlock([('button_page', wagtail.core.blocks.PageChooserBlock(required=False)), ('button_url', wagtail.core.blocks.URLBlock(required=False)), ('button_text', wagtail.core.blocks.CharBlock(default='Learn More', max_length=40, required=True))]))], blank=True, null=True),
        ),
        migrations.AddField(
            model_name='svgs',
            name='stats_headline',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]