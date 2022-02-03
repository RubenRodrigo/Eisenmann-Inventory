
from django.db import models
from django.utils import timezone

# Create your models here.
from client.models import Client


# Este modelo guarda el Servicio.
class Service(models.Model):
    client = models.ForeignKey(
        Client,
        related_name='service',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    code = models.CharField(max_length=8, null=True, blank=True)
    estimated_price = models.CharField(max_length=128, null=True, blank=True)
    init_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    observations = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    state = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.init_date = timezone.now().date()
        self.end_date = timezone.now().date()
        return super(Service, self).save(*args, **kwargs)

    @property
    def final_price(self):
        service_products = self.service_products.all()
        total = sum([item.total_cost for item in service_products])
        return total
