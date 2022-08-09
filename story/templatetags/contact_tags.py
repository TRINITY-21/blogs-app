from urllib.parse import urlparse, urlunparse
from django.http import QueryDict
from django import template
from story.models import StoryPage

register = template.Library()

@register.inclusion_tag('story/contact_page.html')
def contact_form():
    return {'form': StoryPage()}
