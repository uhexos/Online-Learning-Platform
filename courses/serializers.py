from rest_framework import serializers
from .models import *
from django.db.models import Avg
from rest_framework.validators import UniqueTogetherValidator

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id",
                  "username",
                  "first_name",
                  "last_name",
                  "email",
                  "is_staff",
                  "is_active",
                  "date_joined",
                  "is_tutor",
                  "about",
                  "courses",
                  'password']
        # exclude = ["groups"]
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ['id', 'title', 'create_date']
        fields = '__all__'


class CourseRatingSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CourseRating
        fields = ['score', 'course', 'owner']


class CourseSerializer(serializers.ModelSerializer):
    lessons = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    owner = CustomUserSerializer(read_only=True)
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Course
        # fields = ['id', 'title', 'description', 'category', 'owner', 'lessons']
        fields = '__all__'

    def get_thumbnail_url(self, user_account):
        # make url absolute
        request = self.context.get('request')
        thumbnail_url = user_account.thumbnail.url
        return request.build_absolute_uri(thumbnail_url)

    def get_rating(self, obj):
        return obj.rating.aggregate(Avg('score'))


class LessonSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'

class EnrolledCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrolledCourses
        fields = '__all__'