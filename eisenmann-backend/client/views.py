# DRF
from rest_framework import viewsets

# Models
from client.models import Client, DocumentType

# Serializers
from client.serializers import ClientSerializer, DocumentTypeSerializer

# Create your views here.


class DocumentTypeViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentTypeSerializer
    queryset = DocumentType.objects.all()


class ClientViewSet(viewsets.ModelViewSet):
    pagination_class = None
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
