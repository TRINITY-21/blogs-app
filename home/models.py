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
from story.blocks import BodyBlock, CTABlock
from story.models import StoryPage
from wagtailsvg.models import Svg
from wagtailsvg.blocks import SvgChooserBlock
from wagtailsvg.edit_handlers import SvgChooserPanel






class HomePage(Page):
  # subpages home page can create
  subpage_types = [
          'story.StoryListingsPage',
          'home.FaqsPage',
          'home.StoriesOfImpactHomePage',
          'home.ProgressAmount',
          'home.ShortStory',
          'home.SVGPage',
]

      # register parent page
  parent_page_type = ['wagtailcore.Page']

  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)
    svg = SVGs.objects.all()
    print(svg, 'dvggg')
    fp = StoriesOfImpactHomePage.objects.all()
    # Get all stories of impact on home page
    for fps in fp:
      fp_info = StoryPage.objects.filter(title=fps.featured_page1)
      for fp in fp_info:
        print(fp.featured_image)
      fp_info2 = StoryPage.objects.filter(title=fps.featured_page2)
      fp_info3 = StoryPage.objects.filter(title=fps.featured_page3)

      context['fp_info'] = fp_info
      context['fp_info2'] = fp_info2
      context['fp_info3'] = fp_info3

    return context
  # get all funds available to home
  def get_funds(self):
    funds = ProgressAmount.objects.all()
    return funds

  # get short story available to home
  def get_short_story(self):
    s_story = ShortStory.objects.all()
    return s_story

  # get short story available to home
  def get_svg(self):
    svg = SVGs.objects.all()
    print(svg, 'gogogog')
    return svg


class StoriesOfImpactHomePage(Page):
    subpage_types = [ ]
      # No subpage
    parent_page_type = []
    featured_page1 = models.ForeignKey(StoryPage,
            related_name='featured_page1',
            on_delete=models.SET_NULL,
            null=True, blank=True)

    featured_page2 = models.ForeignKey(StoryPage,
            related_name='featured_page2',
            on_delete=models.SET_NULL,
            null=True, blank=True)

    featured_page3 = models.ForeignKey(StoryPage,
            related_name='featured_page3',
            on_delete=models.SET_NULL,
            null=True, blank=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel(
      [
      FieldPanel("featured_page1"),
      ],
      heading="Choose first Story of impact to display on home page ",
        ),        MultiFieldPanel(
      [
      FieldPanel("featured_page2"),
      ],
      heading="Choose second Story of impact to display on home page ",
        ),        MultiFieldPanel(
      [
      FieldPanel("featured_page3"),
      ],
      heading="Choose last Story of impact to display on home page ",
        ),

        ]

# Progress amount
class ProgressAmount(Page):
  subpage_types = []
  parent_page_type = []
  initial_amt = models.IntegerField(null=True, blank=True, default=0)
  final_amt = models.IntegerField(null=True, blank=True, default=0)
  percentage = models.IntegerField( null=True, default=0, blank=True)
  content_panels = Page.content_panels + [
        MultiFieldPanel(
      [
      FieldPanel("initial_amt"),
      ],
      heading="Enter Initial Amount of funds on home page ",
        ),        MultiFieldPanel(
      [
      FieldPanel("final_amt"),
      ],
      heading="Enter Final Amount of funds on home page ",
        ),        MultiFieldPanel(
      [
      FieldPanel("percentage"),
      ],
      heading="Enter Percentage on home page ",
        ),

        ]


# svg section data

class SVGPage(RoutablePageMixin, Page):
  subpage_types = ['home.SVGs']
  parent_page_type = []




class SVGs(Page):
  subpage_types = []
  parent_page_type = []
  svg_image = models.ForeignKey(
        Svg,
        related_name='+',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

  content_panels = Page.content_panels + [
        SvgChooserPanel('svg_image'),
    ]
# middle section data
class ShortStory(Page):
  subpage_types = [ ]
      # No subpage
  parent_page_type = []
  desktop_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="d_image",
    )

  mobile_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="m_image",
    )
  summary = StreamField(BodyBlock(),null=True,blank=True,)


  content_panels =  Page.content_panels + [
  StreamFieldPanel("summary"),
  ImageChooserPanel("mobile_image"),
  ImageChooserPanel("desktop_image"),
  ]

# FAQ Page Model.
class FaqsPage(RoutablePageMixin, Page):
  subpage_types = ['home.FaqPage',]

      # register parent page
  parent_page_type = ['wagtailcore.Page']

  # get form fields
  def get_contact_form_page(self):
        form =  ContactUsPage.objects.get(slug='contact-us')
        return form

  def get_contact_form(self):
        form = self.get_contact_form_page().get_form()
        return form

  def faqs(self):
    all_faq = FaqPage.objects.descendant_of(self).live().order_by('-first_published_at')
    return all_faq


class FaqPage(Page):
  template = "home/faq_page.html"
  subpage_types = []
  parent_page_type = []

  body = StreamField(BodyBlock(),null=True,blank=True,)
  links = StreamField(
        [
            ("cta", CTABlock()),
        ],
        null=True,
        blank=True,
    )

  content_panels = Page.content_panels + [
  StreamFieldPanel("body"),
  StreamFieldPanel("links"),

  ]




