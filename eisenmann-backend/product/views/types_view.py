# DRF
from rest_framework import viewsets

# Models
from product.models.types import Type, Unit

# Serializer
from product.serializers.types_serializer import TypeSerializer, UnitSerializer


class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer
    queryset = type.objects.all()


class UnitViewSet(viewsets.ModelViewSet):
    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
