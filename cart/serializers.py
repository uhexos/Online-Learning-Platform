from rest_framework import serializers
from .models import *
from courses.serializers import CourseSerializer
class ItemSerializer(serializers.ModelSerializer):
    # set unit price to be pulled from course object rather than user supplied 
    course = CourseSerializer(read_only=True)
    class Meta:
        model = Item
        fields = ['id', "course", 'course_id',"cart", 'quantity']
        read_only_fields = ['cart','quantity']

class CartSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    items = ItemSerializer(read_only=True,many=True)
    class Meta:
        model = Cart
        fields = ['id', "creation_date", "checked_out", 'owner', 'items']
        read_only_fields = ['owner']

