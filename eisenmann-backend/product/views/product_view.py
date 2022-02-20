from datetime import datetime
# Django Filters
from django_filters import rest_framework as filters
# DRF
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

# DRF_YASG
from drf_yasg.utils import swagger_auto_schema

# Models
from product.models import Product, ProductStock

# Serializers
from product.serializers import ProductDetailedSerializer, ProductSerializer, ProductStockSerializer
from product.serializers.product_serializer import ProductStockQuerySerializer, ProductStockDetailedSerializer, ProductStockRealSerializer


class ProductFilter(filters.FilterSet):

    class Meta:
        model = Product
        fields = ['state', 'type', 'unit']


class ProductViewSet(viewsets.ModelViewSet):
    """
    Product View. If there are any filter_query, it will list all Product's
    """
    queryset = Product.objects.all()
    filterset_class = ProductFilter
    ordering_fields = ['created_at', 'type', 'unit', 'code']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailedSerializer
        else:
            return ProductSerializer


class ProductStockViewSet(viewsets.ModelViewSet):
    """
    Product Stock View
    """
    queryset = ProductStock.objects.all()

    @swagger_auto_schema(
        query_serializer=ProductStockQuerySerializer,
    )
    def list(self, request):
        """
        List all ProductStocks
        ---
        - Query Parameters:
            - **year: string** -> Value used to filter products by Year (no required)
            - **month: string** -> Value used to filter products by Month (no required)

        If values are no provided, DRF will use year and month of the current date.
        """

        year = request.query_params.get('year')
        month = request.query_params.get('month')
        if year is None or month is None:
            today = datetime.now()
            year = today.year
            month = today.month

        queryset = self.get_queryset()
        product_stock = queryset.filter(
            created_at__year=year, created_at__month=month).order_by('-created_at')

        serializer = self.get_serializer_class()
        serializer = serializer(product_stock, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def set_real_stock(self, request, pk=None):
        serializer = self.get_serializer_class()
        serializer = serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_class(self):
        if self.action == 'set_real_stock':
            return ProductStockRealSerializer
        elif self.action == 'list':
            return ProductStockSerializer
        else:
            return ProductStockDetailedSerializer
