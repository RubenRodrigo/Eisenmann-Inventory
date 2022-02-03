from django.contrib import admin

from service.models.service import Service
from service.models.service_product import ServiceProduct

# Register your models here.

admin.site.register(Service)
admin.site.register(ServiceProduct)
