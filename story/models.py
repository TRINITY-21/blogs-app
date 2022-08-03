"""Story listing and Story detail pages."""
from __future__ import unicode_literals
import re
from django.db.models.functions import Lower
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
        tag_story = StoryPage.objects.filter(secondary_tags__slug__in=tags).order_by('-first_published_at')

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
        print(context['story'], 'stories')
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

  # get header story on listing page by recent story
  def header_story(self):
    return StoryPage.objects.filter().live().order_by('-first_published_at')[:1]

  # route to get all stores with pagination parameters
  @route(r'^$(?:page=(?P<page_num>\d+)/)?')
  def all_stories(self, request,page_num=1, *args, **kwargs):

    # check if current url has any tags
    tag_url = request.GET.get('tags', None)
    if(tag_url== None):
      self.story = self.get_stories()
      self.page_num = int(page_num)
      print(page_num)
      return self.serve(request)

    tag_url_list = tag_url.split(',')
    self.story = self.get_stories().filter(secondary_tags__slug__in=tag_url_list).order_by('-first_published_at')
    self.page_num = int(page_num)
    return self.serve(request)


# Story Page Model.
class StoryPage(Page):
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
  secondary_tags = ClusterTaggableManager(through="story.StoryPageSecondaryTag",blank=True)
  custom_title = models.CharField(
    max_length=100,
    null=True,
    blank=True,
    help_text='Overwrites the default title',
  )
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
  primary_tag = models.CharField(
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


  content_panels = Page.content_panels + [
  FieldPanel('custom_title'),
  FieldPanel("summary"),
  SnippetChooserPanel("author"),
  SnippetChooserPanel("co_author"),
  FieldPanel("primary_tag"),
  MultiFieldPanel(
      [
          FieldPanel("secondary_tags"),
      ],
      heading="Secondary Tags",
    ),
  ImageChooserPanel("featured_image"),
  StreamFieldPanel("body"),

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
    verbose_name_plural = "Secondary Tags"

  def get_secondary_tag(self):
    return self.objects.all()

  # append story page to SecondaryTags
class StoryPageSecondaryTag(TaggedItemBase):
  content_object = ParentalKey("StoryPage", related_name="secondarystory_tags")





