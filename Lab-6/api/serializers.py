from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    total_value = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'quantity', 'total_value', 'created_at']