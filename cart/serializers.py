from rest_framework import serializers
from .models import *

class ItemSerializer(serializers.ModelSerializer):
    # set unit price to be pulled from course object rather than user supplied 
    
    class Meta:
        model = Item
        fields = ['id', "course_id", "cart", 'unit_price', 'quantity']
        read_only_fields = ['cart']

class CartSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    items = ItemSerializer(read_only=True,many=True)
    class Meta:
        model = Cart
        fields = ['id', "creation_date", "checked_out", 'owner', 'items']
        read_only_fields = ['owner']

