from rest_framework import serializers
from product.serializers.product_serializer import ProductStockSerializer
from employee.serializers import EmployeeSerializer
from service.models.service_product import ServiceProduct


# Serializers para los servicios


class ServiceProductSerializer(serializers.ModelSerializer):
    product_stock_detail = ProductStockSerializer(
        source='product_stock', read_only=True)
    employee_detail = EmployeeSerializer(source='employee', read_only=True)

    class Meta:
        model = ServiceProduct
        fields = [
            'id',
            'service',
            'employee',
            'employee_detail',
            'product_stock',
            'product_stock_detail',
            'description',
            'quantity',
            'total_cost'
        ]
        read_only_fields = ['total_cost']

    def validate(self, data):
        if data['quantity'] > data['product_stock'].total_stock:
            raise serializers.ValidationError("no_stock")
        return data

    def create(self, validated_data):
        quantity = validated_data['quantity']
        product_stock = validated_data['product_stock']
        product_entries = product_stock.product_entry.all().order_by('created_at')

        new_stock = quantity

        for product_entry in product_entries:
            new_stock = new_stock - product_entry.stock
            if new_stock > 0:
                product_entry.stock = 0
                product_entry.save()
            elif new_stock == 0:
                product_entry.stock = 0
                product_entry.save()
                break
            else:
                product_entry.stock = -new_stock
                product_entry.save()
                break

        return ServiceProduct.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.service = validated_data.get('service', instance.service)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.employee = validated_data.get('employee', instance.employee)

        if instance.product == validated_data['product']:
            product = instance.product
            product_entry = product.product_entry.latest('created_at')
            quantity = instance.quantity - validated_data['quantity']
            product_entry.stock += quantity
            product_entry.save()
            instance.product = validated_data.get('product', instance.product)

        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
