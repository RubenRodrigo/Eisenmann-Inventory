# DRF
from rest_framework import viewsets, mixins
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

# Utils
from utils.date_utils import get_date_init_end

# Core
from core.pagination import paginate


class ProductAllListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    pagination_class = None
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    filterset_fields = ['state']


class ProductViewSet(viewsets.ModelViewSet):
    """
    Product View. If there are any filter_query, it will list all Product's
    """
    queryset = Product.objects.all()
    # filterset_class = ProductFilter
    ordering_fields = ['created_at', 'type', 'unit', 'code']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action in ['list']:
            return ProductSerializer
        else:
            return ProductDetailedSerializer


class ProductStockViewSet(viewsets.ModelViewSet):
    """
    Product Stock View
    """
    queryset = ProductStock.objects.all()
    ordering_fields = ['created_at', 'real_stock', 'init_stock']
    ordering = ['-created_at']

    @paginate
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
        dt_init, dt_end = get_date_init_end(request)

        # Ordering by query_param
        ordering = self.ordering
        ordering_req = request.query_params.get('ordering')
        if ordering_req in self.ordering_fields:
            ordering = [ordering_req]

        queryset = self.get_queryset()
        product_stock = queryset.filter(
            created_at__gte=dt_init,
            created_at__lt=dt_end
        ).order_by(*ordering)

        return product_stock
        # serializer = self.get_serializer_class()
        # serializer = serializer(product_stock, many=True)
        # return Response(serializer.data)

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
