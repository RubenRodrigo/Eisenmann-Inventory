# DRF
from rest_framework import viewsets

# Models
from product.models.product_entry import ProductEntry

# Serializers
from product.serializers.product_entry_serializer import ProductEntrySerializer


class ProductEntryViewSet(viewsets.ModelViewSet):
    queryset = ProductEntry.objects.all()
    serializer_class = ProductEntrySerializer
