from rest_framework import serializers

from client.serializers import ClientSerializer
from service.models.service import Service
from service.serializers.service_product_serializer import ServiceProductSerializer


# Serializers para los servicios


class ServiceSerializer(serializers.ModelSerializer):
    service_products = serializers.SerializerMethodField()
    client_detail = ClientSerializer(source='client', read_only=True)

    class Meta:
        model = Service
        fields = [
            # Create or Update Fields
            'id',
            'client',
            'code',
            'estimated_price',
            'init_date',
            'end_date',
            'observations',
            'name',
            'state',
            # Read only fields
            # Nested Fields
            'service_products',
            'client_detail',
            # Attribute Fields
            'final_price',
        ]

    def get_service_products(self, instance):
        data = instance.service_products.all().order_by('-id')
        return ServiceProductSerializer(data, many=True, read_only=True).data
