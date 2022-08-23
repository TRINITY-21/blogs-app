
# Register your models here.
from django.contrib import admin
from pillars.models import PillarPages

class PillarPagesAdmin(admin.ModelAdmin):
  def has_add_permission(self, request):
    num_objects = self.model.objects.count()
    if num_objects > 5:
      return False
    else:
      return True

admin.site.register(PillarPages, PillarPagesAdmin)