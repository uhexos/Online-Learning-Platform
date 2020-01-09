from django.shortcuts import redirect
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from .permissions import IsOwnerOrReadOnly, IsSuperUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(id=self.kwargs['pk'])
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj


class LessonList(generics.ListCreateAPIView):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def get_object(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        pk = self.kwargs['pk']
        queryset = self.get_queryset()
        queryset = queryset.filter(course_id=pk)
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj

    def perform_create(self, serializer):
        course = Course.objects.get(id=self.kwargs['pk'])
        serializer.save(owner=self.request.user, course=course)


class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    # queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def get_object(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        course_pk = self.kwargs['pk']
        lesson_pk = self.kwargs['lpk']
        return Lesson.objects.get(course_id=course_pk, id=lesson_pk)


class CustomUserList(generics.ListCreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]


class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    # see any user profile
    permission_classes = [IsOwnerOrReadOnly | IsSuperUser]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class UserProfileView(APIView):
    # see the profile of the logged in user.
    def get(self, request):
        serializer = CustomUserSerializer(
            request.user, context={'request': request})
        return Response(serializer.data)
