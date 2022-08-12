"""Story listing and Story detail pages."""
from __future__ import unicode_literals
from getopt import getopt
from pyexpat import model
from re import template
import re
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





class HomePage(Page):
  # subpages home page can create
  subpage_types = [
          'story.StoryListingsPage',
          'home.FaqsPage',

      ]

      # register parent page
  parent_page_type = [
          'wagtailcore.Page'
      ]
  pass


# FAQ Page Model.
class FaqsPage(RoutablePageMixin, Page):
  subpage_types = [
          'home.FaqPage',
      ]

      # register parent page
  parent_page_type = [
          'wagtailcore.Page'
      ]

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




