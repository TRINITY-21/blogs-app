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
from story.blocks import BodyBlock, CTABlock, CardsCTABlock, HeroCTABlock, InlineVideoBlock, PillarsCTABlock, ProgressCTABlock, StatsCTABlock
from story.models import StoryPage
from wagtailsvg.models import Svg
from wagtailsvg.blocks import SvgChooserBlock
from wagtailsvg.edit_handlers import SvgChooserPanel
from wagtail.embeds.blocks import EmbedBlock
from pillars.models import PillarPages
from django import forms



class HomePage(RoutablePageMixin,Page):
  # subpages home page can create
  subpage_types = [
          'story.StoryListingsPage',
          'home.FaqsPage',
          'home.CardsCTA',
          'home.ProgressHero',
          'home.ImageCTA',
          'home.StatsSVG',
          'pillars.Pillars',
          'home.StatsPage',
]

      # register parent page
  parent_page_type = ['wagtailcore.Page']
  template = "home/welcome_page.html"

  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)
    fp = CardsCTA.objects.all()
    # Get all stories of impact on home page
    for fps in fp:
      fp_info = StoryPage.objects.filter(title=fps.featured_page1)
      for fp in fp_info:
       pass
      fp_info2 = StoryPage.objects.filter(title=fps.featured_page2)
      fp_info3 = StoryPage.objects.filter(title=fps.featured_page3)

      context['fp_info'] = fp_info
      context['fp_info2'] = fp_info2
      context['fp_info3'] = fp_info3

    funds = ProgressHero.objects.all()
    for hero in funds:
      print(hero.cta_hero,'jrii')
      context['heros'] = hero

    stats = StatsPage.objects.all()
    for stat in stats:
      pass
      context['stat'] = stat

    cards = CardsCTA.objects.all()
    for card in cards:
      pass
      context['cards'] = card

    return context

  # get all funds available to home
  def get_funds(self):
    funds = ProgressHero.objects.all()
    for hero in funds:
      pass
    return funds

  # get image available to home
  def get_image_cta(self):
    s_story = ImageCTA.objects.all()
    return s_story

  # get stats available to home
  def get_stats(self):
    stats = StatsPage.objects.all()
    return stats

  # get short story available to home
  def get_svgs(self):
    svg = SVGs.objects.all()
    return svg
  # get all pillars
  def get_all_pillars(self):
    pillars = PillarPages.objects.all()
    return pillars
  # get form fields
  def get_contact_form_page(self):
        form =  ContactUsPage.objects.get(slug='contact-us')
        return form

  def get_contact_form(self):
        form = self.get_contact_form_page().get_form()
        return form
class CardsCTA(Page):
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
    cards_cta = StreamField(
        [
            ("cta", CardsCTABlock()),
        ],
        null=True,
        blank=True,
    )

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
        MultiFieldPanel(
      [
      StreamFieldPanel("cards_cta"),
      ],
      heading="Choose Cards CTA",
        ),

        ]


CHOICES = [('video','Video'),('image','Image')]


# Progress amount
class ProgressHero(Page):
  subpage_types = []
  parent_page_type = []
  background_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="b_image",
  )

  video_url = models.URLField("Video URL", blank=True)
  hero_headline = models.CharField(max_length=100, null=True, blank=True)
  hero_copy = StreamField(BodyBlock(), null=True, blank=True)
  cta_hero = StreamField(
        [
            ("cta", HeroCTABlock()),
        ],
        null=True,
        blank=True,
    )
  progress_cta = StreamField(
        [
            ("cta", ProgressCTABlock()),
        ],
        null=True,
        blank=True,
    )
  initial_amt = models.CharField(max_length=100, null=True, blank=True, default=0)
  final_amt = models.CharField(max_length=100, null=True, blank=True, default=0)
  percentage = models.CharField(max_length=100, null=True, blank=True)
  show_progress_bar = models.CharField(
    max_length=10,
    blank=True,
    null=True,
    choices=[
      ('Yes','Yes'),
      ('No', 'No'),
    ]
  )


  show_video_image = models.CharField(max_length=100,null=True,blank=False )

  content_panels = Page.content_panels + [
    ImageChooserPanel('background_image'),
    FieldPanel('hero_headline'),
        MultiFieldPanel(
      [
      StreamFieldPanel("hero_copy"),
      ],
      heading="Enter Hero Copy",
        ),
        MultiFieldPanel(
      [
      StreamFieldPanel("video_url"),
      ],
      heading="Embed video ",
        ),
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
        ),
        MultiFieldPanel(
      [
      FieldPanel("percentage"),
      ],
      heading="Enter Percentage on home page ",
        ),

      MultiFieldPanel(
      [
      StreamFieldPanel("cta_hero"),
      ],
      heading="Enter CTA on home page ",
        ),

         MultiFieldPanel(
      [
      StreamFieldPanel("progress_cta"),
      ],
      heading="Enter Progress CTA on home page ",
        ),

        FieldPanel('show_progress_bar'),
          MultiFieldPanel(
      [
        FieldPanel('show_video_image', widget=forms.RadioSelect(choices=CHOICES))
      ],
      heading="Show video or background image on home page ",
        ),

        ]

# svg section data
class StatsSVG(RoutablePageMixin, Page):
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

#stas page model
class StatsPage(Page):
  subpage_types = []
  parent_page_type = []

  stats_headline = models.CharField(max_length=100, null=True, blank=True)
  stats_copy = StreamField(BodyBlock(), null=True, blank=True)
  stats_cta = StreamField(
        [
            ("cta", StatsCTABlock()),
        ],
        null=True,
        blank=True,
    )

  content_panels = Page.content_panels + [
        FieldPanel('stats_headline'),
             MultiFieldPanel(
      [
      StreamFieldPanel("stats_copy"),
      ],
      heading="Enter Stats Copy on home page ",
        ),
        MultiFieldPanel(
      [
      StreamFieldPanel("stats_cta"),
      ],
      heading="Enter Link on home page ",
        ),
    ]

# image cta section model
class ImageCTA(Page):
  subpage_types = [ ]
  parent_page_type = []

  image_cta_headline = models.CharField(max_length=100, null=True, blank=True)
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
  FieldPanel("image_cta_headline"),
  StreamFieldPanel("summary"),
  ImageChooserPanel("mobile_image"),
  ImageChooserPanel("desktop_image"),
  ]

# FAQs Page Model.
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
# Faq pagge
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
