# Python
from datetime import datetime
# Django
from django.db import models
from django.core.exceptions import ValidationError

from core.models.BaseModel import BaseModel

# Models
from .types import Unit, Type


# Modelo general del producto
class Product(BaseModel):
    type = models.ForeignKey(
        Type, on_delete=models.SET_NULL, null=True, blank=True)
    unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=12, null=True, blank=True)
    name = models.CharField(max_length=128, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    state = models.BooleanField(default=False)

    def __str__(self):
        return str(self.name)


class ProductStock(models.Model):
    product = models.ForeignKey(
        Product, related_name='product_stock', on_delete=models.SET_NULL, null=True, blank=True)
    init_stock = models.IntegerField(default=0, null=True, blank=True)
    real_stock = models.IntegerField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    state = models.BooleanField(default=False)
    medium_stock = models.IntegerField(default=30, null=True, blank=True)
    minium_stock = models.IntegerField(default=15, null=True, blank=True)

    def __str__(self):
        return str(self.product) + "-" + (self.created_at.strftime('%m/%d/%Y, %H:%M:%S')) if (self.created_at) is not None else ''

    @property
    def total_stock(self):
        """
            - Get current total stock of object ProductStock
            - Total stock is the stock sum of every ProductEntry
            - The value of this property change if ProductEntry change
        """
        product_entries = self.product_entry.all()
        total = sum([item.stock for item in product_entries])
        return total

    @property
    def total_price(self):
        """
            - Get total stock price that has been recorded throughout the month
        """
        product_entries = self.product_entry.all()
        total = sum([item.total_cost for item in product_entries])
        return total

    @property
    def difference_stock(self):
        """
            - Get difference between total_stock and real_stock.
        """
        return self.total_stock - self.real_stock

    @property
    def current_price(self):
        """
            - Get current price of object ProductStock
            - This the price of the last ProductEntry added
        """
        product_entry = self.product_entry.latest('created_at')
        return product_entry.unit_price

    def clean(self):
        if not self.id:
            today = self.created_at
            queryset = ProductStock.objects.filter(product=self.product).filter(
                created_at__year=today.year, created_at__month=today.month)
            if queryset.exists():
                raise ValidationError(
                    'There is another product stock in the current month.')

    def save(self, *args, **kwargs):
        return super(ProductStock, self).save(*args, **kwargs)
