# Django
from django.urls import path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views

router = DefaultRouter()
router.register(r'employee', views.EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls))
]
