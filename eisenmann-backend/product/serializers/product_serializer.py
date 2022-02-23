# Python
from datetime import datetime
# Django
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Max, Min, Count, Sum, F
from django.db import connection
# DRF
from rest_framework import serializers
# Models
from product.models.product_entry import ProductEntry
from product.models.product import Product, ProductStock
# Serializers
from product.serializers.product_entry_serializer import ProductEntrySerializer
from product.serializers.types_serializer import TypeSerializer, UnitSerializer
# Utils
from utils.date_utils import add_months


#################################### QUERY SERIALIZERS ####################################
class ProductStockQuerySerializer(serializers.Serializer):
    year = serializers.IntegerField(required=False)
    month = serializers.IntegerField(required=False)


#################################### BASE SERIALIZERS ####################################
class ProductBaseSerializer(serializers.ModelSerializer):
    """ BaseSerializer for Product with common fields """
    type_detail = TypeSerializer(source='type', read_only=True)
    unit_detail = UnitSerializer(source='unit', read_only=True)

    class Meta:
        model = Product
        fields = [
            # Create or Update Fields
            'id',
            'type',
            'unit',
            'code',
            'name',
            'description',
            'state',

            # Read only Fields
            'created_at',
            'updated_at',

            # 'product_entry',
            'type_detail',
            'unit_detail'
        ]


class ProductStockBaseSerializer(serializers.ModelSerializer):
    """ BaseSerializer for ProductStock with common fields """
    class Meta:
        model = ProductStock
        fields = [
            # Create or Update Fields
            'id',
            'product',
            'init_stock',
            'real_stock',
            'state',
            'medium_stock',
            'minium_stock',
            # Read only fields
            'created_at',
            'updated_at',
            # Attribute Fields
            'total_stock',
            'total_price',
            'difference_stock',
            'current_price',
        ]


#################################### MODEL SERIALIZERS ####################################

class ProductSerializer(ProductBaseSerializer):
    """ For retrive lists of Products """
    pass


class ProductDetailedSerializer(ProductBaseSerializer):
    product_stock = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()

    def get_product_stock(self, instance):
        product_stock = instance.product_stock.all().order_by(
            '-created_at')[:10]
        return ProductStockBaseSerializer(product_stock, many=True).data

    def get_summary(self, instance):
        summary = ProductStock.objects.filter(
            product=instance).aggregate(
            total_stock=Sum('product_entry__stock'),
            total_price=Sum(
                F('product_entry__stock') * F('product_entry__unit_price')
            ),
        )
        return summary

    class Meta(ProductBaseSerializer.Meta):
        fields = ProductBaseSerializer.Meta.fields + [
            'product_stock',
            'summary',
        ]


class ProductStockSerializer(ProductStockBaseSerializer):
    """ For List ProductStock with Product data"""
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta(ProductStockBaseSerializer.Meta):
        model = ProductStock
        fields = ProductStockBaseSerializer.Meta.fields + [
            # Nested Fields
            'product_detail',
        ]


class ProductStockDetailedSerializer(ProductStockBaseSerializer):
    """ For create ProductStock without any other action than validate """
    product_detail = ProductSerializer(source='product', read_only=True)
    product_entry = ProductEntrySerializer(many=True, read_only=True)

    class Meta(ProductStockBaseSerializer.Meta):
        model = ProductStock
        fields = ProductStockBaseSerializer.Meta.fields + [
            # Nested Fields
            'product_detail',
            'product_entry',
        ]

    def validate_product(self, value):
        """ Validate if already exist one ProductStock for the current month """
        today = datetime.now()
        queryset = ProductStock.objects.filter(product=value).filter(
            created_at__year=today.year, created_at__month=today.month)

        if queryset.exists():
            raise serializers.ValidationError(
                {"product": "Ya hay otro producto_stock para este mes"}
            )
        return value

    def create(self, validated_data):
        created_at = datetime.now()
        return ProductStock.objects.create(created_at=created_at, **validated_data)


class ProductStockRealSerializer(serializers.Serializer):
    """  """
    product_stock = serializers.IntegerField(required=True, write_only=True)
    product_stock_detailed = ProductStockDetailedSerializer(read_only=True)

    def validate_product_stock(self, value):
        """
        Validate:
        - if product_stock(current) is an ProductStock object
        - if product_stock(current) has product_entries
        - if exists some ProductStock's in the next month
        """

        product_stock = get_object_or_404(ProductStock, pk=value)

        if not product_stock.product_entry.exists():
            raise serializers.ValidationError(
                {"product_stock": "El producto previo no tiene entradas"}
            )

        created_at = add_months(product_stock.created_at, 1)
        queryset = ProductStock.objects.filter(product=product_stock.product).filter(
            created_at__year=created_at.year, created_at__month=created_at.month)

        if queryset.exists():
            raise serializers.ValidationError(
                {"product_stock": "Ya hay otro producto_stock para el siguiente mes"})

        return product_stock

    def create(self, validated_data):
        """
        Create a ProductStock for the next month with an initial product_entry based on product_stock
        """
        product_stock = validated_data.pop('product_stock')
        created_at = add_months(product_stock.created_at, 1)
        created_at = datetime.combine(created_at, datetime.min.time())
        init_stock = product_stock.real_stock
        current_price = product_stock.current_price

        new_product_stock = ProductStock.objects.create(
            created_at=created_at,
            product=product_stock.product,
            init_stock=init_stock,
        )

        if product_stock.product_entry.exists():
            ProductEntry.objects.create(
                product_stock=new_product_stock,
                init_stock=init_stock,
                stock=init_stock,
                description="Primera entrada",
                unit_price=current_price
            )

        return {"product_stock_detailed": new_product_stock}
