from django.contrib import admin
from product.models.product_entry import ProductEntry

from product.models.product import Product, ProductStock
from product.models.types import Type, Unit

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductStock)
admin.site.register(ProductEntry)
admin.site.register(Type)
admin.site.register(Unit)
