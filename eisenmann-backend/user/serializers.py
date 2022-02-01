from rest_framework import serializers

from user.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'username',
            'date_joined',
            'is_staff',
            'is_active',
            'first_name',
            'last_name',
        ]
