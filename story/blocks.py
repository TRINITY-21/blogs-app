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