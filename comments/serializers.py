from rest_framework import serializers
from .models import Comments


class CommentSerializer(serializers.ModelSerializer):
    # set unit price to be pulled from course object rather than user supplied 
    # course = LessonSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = "__all__"
        # read_only_fields = ['cart','quantity']
