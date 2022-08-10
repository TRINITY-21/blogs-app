from urllib.parse import urlparse, urlunparse
from django.http import QueryDict
from django import template
from wagtail.contrib.forms.forms import FormBuilder

from contact.models import ContactUsPage

register = template.Library()


@register.inclusion_tag('contact/contact_page.html')
def contact_form():
    return {'form': ContactUsPage()}
