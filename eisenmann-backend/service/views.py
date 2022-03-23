from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets

from service.models.service import Service
from service.models.service_product import ServiceProduct
from service.serializers.service_product_serializer import ServiceProductSerializer
from service.serializers.service_serializer import ServiceDetailSerializer, ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    ordering_fields = ['created_at', 'client__name', 'state', 'name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action in ['list']:
            return ServiceSerializer
        else:
            return ServiceDetailSerializer


class ServiceProductViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceProductSerializer
    queryset = ServiceProduct.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        product_entry = instance.product_stock.product_entry
        if product_entry.exists():
            product_entry = product_entry.latest(
                'created_at')
            product_entry.stock += instance.quantity
            product_entry.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
