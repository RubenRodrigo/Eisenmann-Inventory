# DRF
from rest_framework import viewsets

from user.serializers import CustomUserSerializer

# Models
from .models import CustomUser
# Serializers

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
