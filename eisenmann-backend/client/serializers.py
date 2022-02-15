from rest_framework import serializers

from client.models import Client, DocumentType


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    document_type_detail = DocumentTypeSerializer(
        source='document_type', read_only=True)

    class Meta:
        model = Client
        fields = [
            'id',
            'document_type',
            'name',
            'identifier',
            'created_at',
            'updated_at',
            'total_services',
            'document_type_detail'
        ]
