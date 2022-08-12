"""Story listing and Story detail pages."""
from __future__ import unicode_literals
import re
from wagtail.contrib.forms.forms import FormBuilder
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import Tag as TaggitTag
from taggit.models import TaggedItemBase
from wagtail.admin.edit_handlers import (FieldPanel,MultiFieldPanel, StreamFieldPanel)
from wagtail.api import APIField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import (
    FieldPanel,
    FieldRowPanel,
    InlinePanel,
    MultiFieldPanel
)
from wagtail.core.fields import RichTextField
from wagtail.contrib.forms.models import (
    AbstractEmailForm,
    AbstractFormField
)
# local models



class CustomFormBuilder(FormBuilder):
    def get_create_field_function(self, type):
        """
        Override the method to prepare a wrapped function that will call the original
        function (which returns a field) and update the widget's attrs with a custom
        value that can be used within the template when rendering each field.
        """

        create_field_function = super().get_create_field_function(type)
        # self.fields['name'].widget.attrs.update({'class': 'special'})

        def wrapped_create_field_function(field, options):

            created_field = create_field_function(field, options)
            created_field.widget.attrs.update(
             # {"class": field.field_classname} # Important: using the class may be sufficient, depending on how your form is being rendered, try this first.
             {"field_classname": field.field_classname} # this is a non-standard attribute and will require custom template rendering of your form to work
            )

            created_field.widget.attrs.update(
             {"placeholder": field.placeholder}
            )

            print(created_field)

            return created_field

        return wrapped_create_field_function

  #get all form fields
    def get_form_fields(self):
          return self.form_fields.all()

  # add form fields for contact us page
class FormField(AbstractFormField):

    page = ParentalKey("ContactUsPage", related_name="form_fields", on_delete=models.SET_NULL, null=True, blank=True)

    # add custom fields to FormField model
    field_classname = models.CharField("Field classes", max_length=254, blank=True)
    placeholder = models.CharField("Placeholder", max_length=254, blank=True)

    # revise panels so that the field can be edited in the admin UI
    panels = AbstractFormField.panels + [
        FieldPanel("field_classname"),
        FieldPanel("placeholder"),
    ]


class ContactUsPage(AbstractEmailForm):
    form_builder = CustomFormBuilder

    subpage_types = []

      # register parent page
    parent_page_type = []
    # template = "contact_page.html"
    # This is the default path.
    # If ignored, Wagtail adds _landing.html to your template name
    landing_page_template = "contact/contact_page_landing.html"

    intro = RichTextField(blank=True)
    thank_you_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        FieldPanel('intro'),
        InlinePanel('form_fields', label='Form Fields'),
        FieldPanel('thank_you_text'),
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('from_address', classname="col6"),
                FieldPanel('to_address', classname="col6"),
            ]),
            FieldPanel("subject"),
        ], heading="Email Settings"),
    ]



