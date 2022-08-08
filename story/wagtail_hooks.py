from wagtail.snippets.wagtail_hooks import SnippetsMenuItem
from wagtail.core import hooks

@hooks.register('construct_main_menu')
def hide_snippets_menu_item(request, menu_items):
    menu_items[:] = [item for item in menu_items if not isinstance(item, SnippetsMenuItem)]