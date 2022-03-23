from django.contrib import admin

# Register your models here.
from client.models import Client, DocumentType

admin.site.register(Client)
admin.site.register(DocumentType)
