# Django
from django.urls import path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views


router = DefaultRouter()
router.register(r'client', views.ClientViewSet, basename="client")

urlpatterns = [
    path('', include(router.urls))
]
