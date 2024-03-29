from django.shortcuts import redirect
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from .permissions import IsOwnerOrReadOnly, IsSuperUser, IsTutorUser, OwnsCourse, CourseIsLive
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.http import Http404
# from django.contrib.postgres.search import SearchVector
from rest_framework import filters
from .filters import CourseFilter
from django_filters import rest_framework as filterss
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from math import ceil


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'current': self.page.number,
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'pages': ceil(self.page.paginator.count/self.page_size),
            'results': data
        })


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsSuperUser | IsAdminUser]


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsSuperUser | IsAdminUser]


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, filterss.DjangoFilterBackend, ]
    search_fields = ['owner__username', 'title', 'description']
    filterset_class = CourseFilter
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsTutorUser]

    def get_queryset(self):
        # return only items that the user hasnt already purchased the ~Q is used for negation here.
        obj = Course.objects.filter(
            ~Q(bought_courses__user=self.request.user), Q(is_live=True))
        return obj

    def perform_create(self, serializer):
        self.check_object_permissions(self.request, self.request.user)
        serializer.save(owner=self.request.user)


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(id=self.kwargs['pk'])
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj.owner)
        return obj


class LessonList(generics.ListCreateAPIView):
    serializer_class = UnpurchasedLessonSerializer
    queryset = Lesson.objects.all()
    permission_classes = [CourseIsLive]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PurchasedLessonSerializer
        return UnpurchasedLessonSerializer

    def get_queryset(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        course_id = self.kwargs['pk']
        obj = Lesson.objects.filter(course__id=course_id)
        self.check_object_permissions(self.request, course_id)
        return obj

    def perform_create(self, serializer):
        course = Course.objects.get(id=self.kwargs['pk'])
        serializer.save(owner=self.request.user, course=course)


class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [OwnsCourse]
    # queryset = Lesson.objects.all()
    serializer_class = PurchasedLessonSerializer

    def get_object(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        course_pk = self.kwargs['pk']
        lesson_pk = self.kwargs['lpk']
        obj = Lesson.objects.get(course_id=course_pk, id=lesson_pk)
        self.check_object_permissions(self.request, obj)
        return obj


class CustomUserList(generics.ListCreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]


class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    # see any user profile
    permission_classes = [IsOwnerOrReadOnly | IsSuperUser]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class UserProfileView(generics.RetrieveUpdateAPIView):
    # see the profile of the logged in user.
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        user_id = self.request.user.id
        obj = CustomUser.objects.get(id=user_id)
        self.check_object_permissions(self.request, obj)
        return obj


class CourseRatingCreateView(generics.CreateAPIView):
    serializer_class = CourseRatingSerializer
    queryset = CourseRating.objects.all()

    def perform_create(self, serializer):
        course = Course.objects.get(id=self.kwargs['pk'])
        serializer.save(owner=self.request.user, course=course)


# post rating if no previous vote
class CourseRatingDetailsView(generics.RetrieveUpdateAPIView):
    serializer_class = CourseRatingSerializer
    queryset = CourseRating.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        course_pk = self.kwargs['pk']
        owner = self.request.user
        try:
            obj = CourseRating.objects.get(course=course_pk, owner=owner)
        except CourseRating.DoesNotExist:
            raise Http404("No MyModel matches the given query.")
        self.check_object_permissions(self.request, obj)
        return obj
# put rating if previous vote


class BoughtCoursesList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, filterss.DjangoFilterBackend, ]
    search_fields = ['owner__username', 'title', 'description']
    filterset_class = CourseFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return Course.objects.filter(bought_courses__user=self.request.user)
