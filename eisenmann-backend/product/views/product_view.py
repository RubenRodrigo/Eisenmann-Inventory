# Django
from django.http import Http404
from django.utils import timezone

# DRF
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# Models
from product.models import Product, ProductStock

# Serializers
from product.serializers import ProductDetailedSerializer, ProductSerializer, ProductStockRealSerializer, ProductStockSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailedSerializer
        else:
            return ProductSerializer


class ProductStockViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = ProductStock.objects.all()
    serializer_class = ProductStockSerializer

    def list(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        if year is None or month is None:
            today = timezone.now()
            year = today.year
            month = today.month

        queryset = self.get_queryset()
        product_stock = queryset.filter(
            created_at__year=year, created_at__month=month).order_by('-created_at')

        serializer = self.get_serializer_class()
        serializer = serializer(product_stock, many=True)
        return Response(serializer.data)


class CreateProductStockReal(APIView):
    """
    Create a new product_stock real.
    """

    def post(self, request, format=None):
        serializer = ProductStockRealSerializer(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductStockReal(APIView):
    """
    Update of one product_stock.
    """

    @staticmethod
    def get_object(pk):
        try:
            return ProductStock.objects.get(pk=pk)
        except ProductStock.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product_stock = self.get_object(pk)
        serializer = ProductStockRealSerializer(
            product_stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
