from rest_framework import serializers

from client.serializers import ClientSerializer
from service.models.service import Service
from service.serializers.service_product_serializer import ServiceProductSerializer


# Serializers para los servicios

#################################### BASE SERIALIZERS ####################################
class ServiceBaseSerializer(serializers.ModelSerializer):
    """ BaseSerializer for Service with common fields """
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
            'client_detail',
            # Attribute Fields
            'final_price',
        ]


#################################### MODEL SERIALIZERS ####################################
class ServiceSerializer(ServiceBaseSerializer):
    """ For lists of Services """
    pass


class ServiceDetailSerializer(ServiceBaseSerializer):
    """ For retrive an Service """
    service_product = ServiceProductSerializer(many=True, read_only=True)

    class Meta(ServiceBaseSerializer.Meta):
        fields = ServiceBaseSerializer.Meta.fields + [
            'service_product',
        ]
