from django.shortcuts import render
from .serializers import *
from .models import Comments
from rest_framework import generics
# Create your views here.


class LessonCommentList(generics.CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
            return Comments.objects.filter(cart__owner=self.request.user)
