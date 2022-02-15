# Django
from django.urls import path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views


router = DefaultRouter()
router.register(r'client', views.ClientViewSet, basename="client")
router.register(r'document_type', views.DocumentTypeViewSet,
                basename="document_type")

urlpatterns = [
    path('', include(router.urls))
]
