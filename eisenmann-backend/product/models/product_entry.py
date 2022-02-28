# Django
from django.db import models

from core.models.BaseModel import BaseModel
# Models
from .product import ProductStock

# Modelo general de entrada de producto


class ProductEntry(BaseModel):
    product_stock = models.ForeignKey(
        ProductStock, related_name='product_entry', on_delete=models.CASCADE)
    init_stock = models.IntegerField(default=0, null=True, blank=True)
    stock = models.IntegerField(default=0, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    unit_price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.created_at.strftime('%m/%d/%Y, %H:%M:%S')

    # Total cost of this entry.
    # is how much money has been spent on this entry
    @property
    def total_cost(self):
        return int(self.unit_price * self.init_stock)

    class Meta:
        ordering = ['-created_at']
