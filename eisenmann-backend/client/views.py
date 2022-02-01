# DRF
from rest_framework import viewsets

# Models
from client.models import Client

# Serializers
from client.serializers import ClientSerializer

# Create your views here.


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
