from rest_framework import serializers

from product.models.product_entry import ProductEntry


class ProductEntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductEntry
        fields = [
            'id',
            'product_stock',
            'init_stock',
            'stock',
            'description',
            'unit_price',
            'created_at',
            'updated_at',
            'total_cost'
        ]
