from rest_framework import serializers
from .models import *


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ['id', "creation_date", "checked_out", 'owner']
        read_only_fields = ['owner']


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        # fields = ['id',"creation_date","checked_out",'owner']
        fields = '__all__'
