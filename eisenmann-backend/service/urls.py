from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(
    r'service',
    views.ServiceViewSet,
    basename="service")
router.register(
    r'service_product',
    views.ServiceProductViewSet,
    basename="service_product")

urlpatterns = [
    path('', include(router.urls))
]
