from wagtail.core.blocks import (
BooleanBlock,
CharBlock,
ChoiceBlock,
DateTimeBlock,
FieldBlock,
IntegerBlock,
ListBlock,
PageChooserBlock,
RawHTMLBlock,
RichTextBlock,
StreamBlock,
StructBlock,
StructValue,
TextBlock,
URLBlock,
)
from wagtail.core.models import Orderable, Page
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock
from wagtail.images.blocks import ImageChooserBlock
from django.utils.translation import gettext_lazy as _
from wagtail.core import blocks
from wagtail.core.blocks import CharBlock
from wagtail.embeds.blocks import EmbedBlock

class CustomImageChooserBlock(ImageChooserBlock):
	def __init__(self, *args, **kwargs):
		self.rendition = kwargs.pop("rendition", "original")
		super().__init__(**kwargs)

	def get_api_representation(self, value, context=None):
		return ImageRenditionField(self.rendition).to_representation(value)



class ImageText(StructBlock):
	reverse = BooleanBlock(required=False)
	text = RichTextBlock()
	image = CustomImageChooserBlock(rendition="width-800")

class InlineVideoBlock(StructBlock):
    video = EmbedBlock(label=_("Video"))
    caption = CharBlock(required=False, label=_("Caption"))
    float = blocks.ChoiceBlock(
        required=False,
        choices=[('right', _("Right")), ('left', _("Left")), ('center', _("Center"))],
        default='right',
        label=_("Float"),
    )
    size = blocks.ChoiceBlock(
        required=False,
        choices=[('small', _("Small")), ('medium', _("Medium")), ('large', _("Large"))],
        default='small',
        label=_("Size"),
    )

    class Meta:
        icon = 'media'

class BodyBlock(StreamBlock):
	h1 = CharBlock()
	h2 = CharBlock()
	paragraph = RichTextBlock()
	image_text = ImageText()
	image_carousel = ListBlock(CustomImageChooserBlock())
	thumbnail_gallery = ListBlock(CustomImageChooserBlock())


# streams/blocks.py
"""Streamfields live in here."""

from wagtail.core import blocks


class CTABlock(blocks.StructBlock):
    """A simple call to action section."""

    # title = blocks.CharBlock(required=True, max_length=60)
    # text = blocks.RichTextBlock(required=True, features=["bold", "italic"])
    button_page = blocks.PageChooserBlock(required=False)
    button_url = blocks.URLBlock(required=False)
    button_text = blocks.CharBlock(required=True, default='Learn More', max_length=40)

    class Meta:  # noqa
        template = "home/cta_block.html"
        icon = "placeholder"
        label = "Call to Action"


from wagtail.images.blocks import ImageChooserBlock


class HeroCTABlock(blocks.StructBlock):
    """A simple call to action section."""
    button_page = blocks.PageChooserBlock(required=False)
    button_url = blocks.URLBlock(required=False)
    button_text = blocks.CharBlock(required=True, default='Learn More', max_length=40)

    class Meta:  # noqa
        template = "home/hero_cta_block.html"
        icon = "placeholder"
        label = "Call to Action"

class StatsCTABlock(blocks.StructBlock):
    """A simple call to action section."""
    button_page = blocks.PageChooserBlock(required=False)
    button_url = blocks.URLBlock(required=False)
    button_text = blocks.CharBlock(required=True, default='Learn More', max_length=40)

    class Meta:  # noqa
        template = "home/stats_cta_block.html"
        icon = "placeholder"
        label = "Call to Action"

class CardsCTABlock(blocks.StructBlock):
    """A simple call to action section."""
    button_page = blocks.PageChooserBlock(required=False)
    button_url = blocks.URLBlock(required=False)
    button_text = blocks.CharBlock(required=True, default='Learn More', max_length=40)

    class Meta:  # noqa
        template = "home/cards_cta_block.html"
        icon = "placeholder"
        label = "Call to Action"