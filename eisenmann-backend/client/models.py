from django.db import models

from core.models.BaseModel import BaseModel


# Create your models here.
class DocumentType(BaseModel):
    name = models.CharField(max_length=110)
    description = models.CharField(max_length=128, blank=True, null=True)

# Este modelo contiene la informacion del cliente
# El cliente es la persona que solicito el servicio


class Client(BaseModel):
    document_type = models.ForeignKey(
        DocumentType,
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    name = models.CharField(max_length=32, null=True, blank=True)
    identifier = models.CharField(max_length=128, null=True, blank=True)

    # ultimo_servicio = models.DateField(null=True, blank=True)
    def __str__(self):
        return self.name

    @property
    def total_services(self):
        services = self.client_services.all().count()
        return services
