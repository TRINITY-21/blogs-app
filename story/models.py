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
from .blocks import BodyBlock


# Stories Listing page
class StoryListingsPage(RoutablePageMixin, Page):
  template = "story/story_listings_page.html"

  # overwrite context returned to include pagination
  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)

    # get tags from url
    tag_string = request.GET.get('tags', None)

    if tag_string:
        tags = re.split('[,;|]', tag_string.lower())
        tag_story = StoryPage.objects.filter(tags__slug__in=tags).order_by('-first_published_at')

        """Pagination"""
        per_page = 2
        paginator = Paginator(tag_story, per_page)
        # page = self.page_num
        page = request.GET.get("page")

        try:
          story = paginator.page(page)
        except PageNotAnInteger:
          story = paginator.page(1)
        except EmptyPage:
          story = paginator.page(paginator.num_pages)
        context['story'] = story
        return context
    else:
        per_page = 4
        paginator = Paginator(self.story, per_page)
        # page = self.page_num
        page = request.GET.get("page")

        try:
          story = paginator.page(page)
        except PageNotAnInteger:
          story = paginator.page(1)
        except EmptyPage:
          story = paginator.page(paginator.num_pages)

        context['story'] = story
        return context


  # get all stories
  def get_stories(self):
    return StoryPage.objects.descendant_of(self).order_by('-first_published_at').live()

  # get all tags
  def get_tags(self):
    return SecondaryTag.objects.all()

  # add select featured page content
  def get_featured_page(self):
    fp = FeaturedPage.objects.all()
    for fps in fp:
      fp_info = StoryPage.objects.filter(title=fps.featured)
      return fp_info

  # route to get all stores with pagination parameters
  @route(r'^$(?:page=(?P<page_num>\d+)/)?')
  def all_stories(self, request,page_num=1, *args, **kwargs):

    # check if current url has any tags
    tag_url = request.GET.get('tags', None)
    if(tag_url== None):
      self.story = self.get_stories()
      self.page_num = int(page_num)
      return self.serve(request)

    tag_url_list = tag_url.split(',')
    self.story = self.get_stories().filter(tags__slug__in=tag_url_list).order_by('-first_published_at')
    self.page_num = int(page_num)
    return self.serve(request)



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

# Story Page Model.
class StoryPage(AbstractEmailForm,Page):
  template = "story/story_page.html"
  featured_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="+",
    )
  body = StreamField(BodyBlock(),null=True,blank=True,)
  # primary_tags = ClusterTaggableManager(through="story.StoryPagePrimaryTag",related_name='primary_tags',blank=True,)
  tags = ClusterTaggableManager(through="story.StoryPageSecondaryTag",blank=True)
  summary = models.CharField(
    max_length=100,
    null=True,
    blank=True,
    help_text='Overwrites the default title',
  )
  author = models.ForeignKey(
    "story.Author",
    on_delete=models.SET_NULL,
    null=True,blank=True,
    related_name='author'
  )

  co_author = models.ForeignKey(
    "story.Author",
    on_delete=models.SET_NULL,
    null=True,blank=True,
    related_name='co_author'

  )

  # every story can have one primary tag to be displayed on the frontend
  display_tags = models.CharField(
    max_length=100,
    blank=True,
    null=True,
    choices=[
    ('Recent Gifts & Milestones','Recent Gifts & Milestones'),
    ('Undergrad Scholarships','Undergrad Scholarships'),
    ('Graduate Fellowships','Graduate Fellowships'),
    ('Health & Wellness','Health & Wellness'),
    ('Career Advising', 'Career Advising'),
    ('Co-Curricular Experience','Co-Curricular Experience'),
    ]
  )

  # add contact us details
  # description = models.CharField(max_length=255, blank=True, null=True)
  thank_you_text = RichTextField(blank=True)

  content_panels =  Page.content_panels + [
  FieldPanel("summary"),
  SnippetChooserPanel("author"),
  SnippetChooserPanel("co_author"),
  MultiFieldPanel(
      [
      FieldPanel("tags"),
      ],
      heading="Tags",
    ),
      MultiFieldPanel(
      [
      FieldPanel("display_tags"),
      ],
      heading="Choose tag to display",
    ),

  ImageChooserPanel("featured_image"),
  StreamFieldPanel("body"),
  # FieldPanel('description', classname="full"),
  # InlinePanel('custom_form_field', label="Form fields"),
  # FieldPanel('thank_you_text', classname="full"),
  # MultiFieldPanel([
  #     FieldRowPanel([

  #     FieldPanel('from_address', classname="col6"),
  #     FieldPanel('to_address', classname="col6"),
  #     ]),
  #     FieldPanel('subject'),
  # ], "Email Notification Config"),
  ]

  #get all form fields
  def get_form_fields(self):
          return self.custom_form_field.all()

  # add form fields for contact us page
class FormField(AbstractFormField):

    page = ParentalKey("ContactPage", related_name="form_fields", on_delete=models.SET_NULL, null=True)

    # add custom fields to FormField model
    field_classname = models.CharField("Field classes", max_length=254, blank=True)
    placeholder = models.CharField("Placeholder", max_length=254, blank=True)

    # revise panels so that the field can be edited in the admin UI
    panels = AbstractFormField.panels + [
        FieldPanel("field_classname"),
        FieldPanel("placeholder"),
    ]


class ContactPage(AbstractEmailForm):
    form_builder = CustomFormBuilder

    template = "contact/contact_page.html"
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






# Authors Model
class Author(models.Model):
  """ Story Author for snippets."""
  firstname = models.CharField(max_length=100, null=True, blank=True)
  lastname = models.CharField(max_length=100, null=True,blank=True)
  job_title = models.CharField(max_length=100, null=True,blank=True)

  panels = [
    MultiFieldPanel(
      [
        FieldPanel("firstname"),
        FieldPanel("lastname"),
        FieldPanel("job_title"),
      ],
      heading="Name and Job Title",
    ),
  ]

  def __str__(self):
    """String repr of this class."""
    return self.firstname

  class Meta:
    verbose_name = "Story Author"
    verbose_name_plural = "Story Authors"

    """Register as snippet"""
register_snippet(Author)


# Secondary tags model to be used for filtering and every story can have one or more
@register_snippet
class SecondaryTag(TaggitTag):

  class Meta:
    proxy = True
    verbose_name = "Secondary Tags"
    verbose_name_plural = "Secondary Tags (DO NOT EDIT)"

  def get_secondary_tag(self):
    return self.objects.all()

  # append story page to SecondaryTags
class StoryPageSecondaryTag(TaggedItemBase):
  content_object = ParentalKey("StoryPage", related_name="secondarystory_tags")

  # add story featured page to story listings
class FeaturedPage(Page):
    featured = models.ForeignKey('StoryPage',
            related_name='+',
            on_delete=models.SET_NULL,
            null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('featured'),
    ]