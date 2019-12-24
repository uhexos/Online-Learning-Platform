from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ['id', 'title', 'create_date']
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    lessons = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Course
        # fields = ['id', 'title', 'description', 'category', 'owner', 'lessons']
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CustomUser
        fields = '__all__'
    
    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user