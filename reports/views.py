from django.shortcuts import render
from rest_framework import generics, permissions
from courses.models import EnrolledCourses
from .serializers import  SalesSerializer
# Create your views here.


class SalesList(generics.ListAPIView):
    queryset = EnrolledCourses.objects.all()
    serializer_class = SalesSerializer

    def get_queryset(self):
            return EnrolledCourses.objects.filter(course__owner=self.request.user)
