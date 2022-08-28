from django.templatetags.static import static
from django.utils.html import format_html

from wagtail.core import hooks

# @hooks.register('insert_editor_css')
# def editor_css():
#     return format_html(
#         '<link rel="stylesheet" href="{}">',
#         static('css/styles.css')
#     )

# @hooks.register("insert_global_admin_css", order=100)
# def global_admin_css():
#     """Add /static/admin_tweaks/wagtail.css."""
#     return format_html('<link rel="stylesheet" href="{}">', static("css/styles.css"))

@hooks.register('register_rich_text_features')
def make_h1_default(features):
    features.default_features.append('h1')
import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import (
    InlineStyleElementHandler,
)


@hooks.register('register_rich_text_features')
def register_strong_feature(features):
    """
    Registering the `strong` feature. It will render bold text with `strong` tag.
    Default Wagtail uses the `b` tag.
    """
    feature_name = 'strong'
    type_ = 'BOLD'
    tag = 'strong'

    # Configure how Draftail handles the feature in its toolbar.
    control = {
        'type': type_,
        'icon': 'bold',
        'description': 'Bold',
    }

    # Call register_editor_plugin to register the configuration for Draftail.
    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    # Configure the content transform from the DB to the editor and back.
    db_conversion = {
        'from_database_format': {tag: InlineStyleElementHandler(type_)},
        'to_database_format': {'style_map': {type_: tag}},
    }

    # Call register_converter_rule to register the content transformation conversion.
    features.register_converter_rule('contentstate', feature_name, db_conversion)


@hooks.register('register_rich_text_features')
def register_em_feature(features):
    """
    Registering the `em` feature. It will render italic text with `em` tag.
    Default Wagtail uses the `i` tag.
    """
    feature_name = 'em'
    type_ = 'ITALIC'
    tag = 'em'

    control = {
        'type': type_,
        'icon': 'italic',
        'description': 'Italic',
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: InlineStyleElementHandler(type_)},
        'to_database_format': {'style_map': {type_: tag}},
    }

    features.register_converter_rule('contentstate', feature_name, db_conversion)



@hooks.register("construct_main_menu")
def change_snippet_name(request, menu_items):
    for item in menu_items:
        if item.__class__.__name__ == "SnippetsMenuItem":
            item.label = "Authors"