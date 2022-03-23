# DRF
from rest_framework import viewsets

# Models
from employee.models import Employee

# Serializers
from employee.serializers import EmployeeSerializer


# Create your views here.
class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    pagination_class = None
    ordering = ['-created_at']
