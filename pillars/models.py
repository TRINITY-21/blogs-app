"""Story Home and Story detail pages."""
from __future__ import unicode_literals
from getopt import getopt
from pyexpat import model
from re import template
import re
from turtle import home
from django.db.models.functions import Lower
from urllib import request
from django import forms
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from django.http import JsonResponse
from django.http.response import JsonResponse
from django.shortcuts import render
from django.utils.module_loading import import_string
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.tags import ClusterTaggableManager
from rest_framework.fields import Field
from taggit.models import Tag as TaggitTag
from taggit.models import TaggedItemBase
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import (FieldPanel, FieldRowPanel,
                     InlinePanel, MultiFieldPanel,
                     PageChooserPanel, StreamFieldPanel)
from wagtail.api import APIField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Orderable, Page, Site
from contact.models import ContactUsPage
from story.blocks import BodyBlock, CTABlock, CardsCTABlock, HeroCTABlock, InlineVideoBlock, PillarsCTABlock, StatsCTABlock
from story.models import StoryPage
from wagtailsvg.models import Svg
from wagtailsvg.blocks import SvgChooserBlock
from wagtailsvg.edit_handlers import SvgChooserPanel
from wagtail.embeds.blocks import EmbedBlock


# Create your models here.

class Pillars(RoutablePageMixin, Page):
  subpage_types = ['pillars.PillarPages']
  parent_page_type = []

  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)
    pillars = self.pillar
    stories = self.posts

    context['pillar_stories'] = stories
    context['pillars'] = pillars
    return context



  @route(r"^pillar/(?P<pillar_tag>[-\w]+)/$", name="stories_by_pillars")
  def stories_by_tag(self, request, pillar_tag, *args, **kwargs):
    print(pillar_tag, 'pissse')

    self.posts = StoryPage.objects.filter(tags__slug__in=[pillar_tag]).order_by('-first_published_at')[:3]
    self.pillar = PillarPages.objects.filter(slug=pillar_tag).order_by('-first_published_at')
    print(self.pillar, 'self.pilll')

    return self.serve(request)
  # get form fields
  def get_contact_form_page(self):
        form =  ContactUsPage.objects.get(slug='contact-us')
        return form

  def get_contact_form(self):
        form = self.get_contact_form_page().get_form()
        return form
# Pillar Page
class PillarPages(RoutablePageMixin,Page):
  template = 'pillars/pillars.html'
  max_count = 5

  subpage_types = []
  parent_page_type = []


  dollars_raised = models.CharField(max_length=100, default=0, null=True, blank=True)
  percent_to_goal = models.CharField(max_length=100, default=0,  null=True, blank=True)
  featured_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="+",
    )

  teaser_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="+",
    )
  body = StreamField(BodyBlock(),null=True,blank=True,)
  summary = models.TextField(
    null=True,
    blank=True,
    help_text='Overwrites the default title',
  )

  # pillars_featured_page1 = models.ForeignKey(StoryPage,
  #         related_name='pillars_featured_page1',
  #         on_delete=models.SET_NULL,
  #         null=True, blank=True)

  # pillars_featured_page2 = models.ForeignKey(StoryPage,
  #         related_name='pillars_featured_page2',
  #         on_delete=models.SET_NULL,
  #         null=True, blank=True)

  # pillars_featured_page3 = models.ForeignKey(StoryPage,
  #         related_name='pillars_featured_page3',
  #         on_delete=models.SET_NULL,
  #         null=True, blank=True)

  pillars_cta = StreamField(
      [
          ("cta", PillarsCTABlock()),
      ],
      null=True,
      blank=True,
  )
  show_dollars_bar = models.CharField(
    max_length=10,
    blank=True,
    null=True,
    choices=[
      ('Yes','Yes'),
      ('No', 'No'),
    ]
  )


  content_panels =  Page.content_panels + [
  FieldPanel("dollars_raised"),
  FieldPanel("percent_to_goal"),
  FieldPanel("show_dollars_bar"),
  ImageChooserPanel("featured_image"),
  ImageChooserPanel("teaser_image"),
  FieldPanel("summary"),
  StreamFieldPanel("body"),
  # MultiFieldPanel(
  #     [
  #     FieldPanel("pillars_featured_page1"),
  #     ],
  #     heading="Choose first Story of impact to display on Pillar page ",
  #       ),        MultiFieldPanel(
  #     [
  #     FieldPanel("pillars_featured_page2"),
  #     ],
  #     heading="Choose second Story of impact to display on Pillar page ",
  #       ),        MultiFieldPanel(
  #     [
  #     FieldPanel("pillars_featured_page3"),
  #     ],
  #     heading="Choose last Story of impact to display on Pillar page ",
  #       ),
        MultiFieldPanel(
      [
      StreamFieldPanel("pillars_cta"),
      ],
      heading="Choose Pillar CTA",
        ),

  ]


  @route(r"^/pillar/(?P<pillar_tag>[-\w]+)/$", name="stories_by_pillars")
  def stories_by_tag(self, request, pillar_tag, *args, **kwargs):
    print(pillar_tag, 'pissse')

    posts = StoryPage.objects.filter(slug=pillar_tag)
    print(posts, 'pis')


    return self.serve(request)

  def get_latest_pillars(self):
    pillars = Pillars.objects.all()
    # print(pillars, 'pillars')
    return pillars



  def get_pillar(self):
    pillars = Pillars.objects.all()
    # print(pillars,'pillars')
    return pillars

