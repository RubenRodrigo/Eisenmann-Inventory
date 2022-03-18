# Django
from django.db import models
from django.core.exceptions import ValidationError
from core.models.BaseModel import BaseModel

# Models
from product.models.product import ProductStock
from service.models.service import Service
from employee.models import Employee


class ServiceProduct(BaseModel):
    """Este modelo guarda los productos que se guardan en un servicio"""
    service = models.ForeignKey(
        Service,
        related_name='service_product',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    product_stock = models.ForeignKey(
        ProductStock,
        related_name='service_product',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    employee = models.ForeignKey(
        Employee,
        related_name='service_product',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    description = models.TextField(null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    total_cost = models.FloatField(default=0.0, null=True, blank=True)

    def clean(self):
        if not self.product_stock.product_entry.exists():
            raise ValidationError('This product has not entries.')

    def save(self, *args, **kwargs):
        self.total_cost = self.quantity * self.product_stock.current_price
        return super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']
