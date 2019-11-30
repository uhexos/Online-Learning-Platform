from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
# Create your views here.
from django.http import JsonResponse
from django.middleware.csrf import get_token

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    return JsonResponse({'result': 'OK'})
    
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
      
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    # queryset = Course.objects.all()
    serializer_class = CourseSerializer
    def get_object(self):
        return Course.objects.get(id=self.kwargs['pk'])

class LessonList(generics.ListCreateAPIView):
    serializer_class = LessonSerializer
    def get_queryset(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        pk = self.kwargs['pk']
        qs = Lesson.objects.filter(course_id=pk)
        return qs

    def perform_create(self, serializer):
        course =  Course.objects.get(id=self.kwargs['pk'])
        serializer.save(owner=self.request.user, course=course)
             

class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    # queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    def get_object(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        course_pk = self.kwargs['pk']
        lesson_pk = self.kwargs['lpk']
        return  Lesson.objects.get(course_id=course_pk,id=lesson_pk)

class CustomUserList(generics.ListCreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()