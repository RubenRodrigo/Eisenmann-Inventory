# DRF
from rest_framework import serializers

# Models
from product.models.types import Type, Unit


class TypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Type
        fields = ['id',  'name', 'description']


class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        fields = ['id',  'name', 'description', 'abr']
