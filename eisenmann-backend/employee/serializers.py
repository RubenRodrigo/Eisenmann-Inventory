from rest_framework import serializers

from employee.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = [
            'id',
            'firts_name',
            'last_name',
            'created_at',
            'updated_at',
        ]
