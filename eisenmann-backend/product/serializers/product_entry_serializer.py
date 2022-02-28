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
        read_only_fields = ['init_stock']

    def create(self, validated_data):
        return ProductEntry.objects.create(init_stock=validated_data.get('stock', 0), **validated_data)
