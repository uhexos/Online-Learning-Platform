from rest_framework import serializers
from courses.models import EnrolledCourses,Course


class SalesCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
class SalesSerializer(serializers.ModelSerializer):
    course = SalesCourseSerializer(read_only=True)

    class Meta:
        model = EnrolledCourses
        fields = '__all__'
