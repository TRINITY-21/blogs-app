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
from story.blocks import BodyBlock





class HomePage(Page):
    pass


# FAQ Page Model.
class FaqPage(Page):
  template = "home/faq_page.html"
  body = StreamField(BodyBlock(),null=True,blank=True,)
  custom_title = models.CharField(
    max_length=100,
    null=True,
    blank=True,
    help_text='Overwrites the default title',
  )

  content_panels = Page.content_panels + [
  FieldPanel('custom_title'),
  StreamFieldPanel("body"),

  ]

  def get_context(self, request, *args, **kwargs):
    """Adding custom stuff to our context."""
    context = super().get_context(request, *args, **kwargs)
    # Get all faq
    all_faq = FaqPage.objects.descendant_of(self).live().order_by('-first_published_at')
    context['faqss'] = all_faq

    # for faq in context['faqs']:
    #     context['faq'] = faq
    # print(context['faq'])

    return context


  def faqs(self):
    all_faq = FaqPage.objects.descendant_of(self).live().order_by('-first_published_at')
    return all_faq


