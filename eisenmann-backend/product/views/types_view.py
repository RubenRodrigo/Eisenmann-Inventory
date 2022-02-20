# DRF
from rest_framework import viewsets

# Models
from product.models.types import Type, Unit

# Serializer
from product.serializers.types_serializer import TypeSerializer, UnitSerializer


class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer
    queryset = Type.objects.all()
    pagination_class = None
    ordering_fields = ['name']
    ordering = ['name']


class UnitViewSet(viewsets.ModelViewSet):
    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
    pagination_class = None
    ordering_fields = ['name']
    ordering = ['name']
