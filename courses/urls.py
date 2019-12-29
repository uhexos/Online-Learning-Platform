from django.urls import path
from .views import UserProfileView, CategoryList,CategoryDetail,CourseList,CourseDetail,LessonDetail,LessonList,CustomUserList,CustomUserDetail


urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view() ,name='category-detail'),
    path('courses/', CourseList.as_view(),name='course-list'),
    path('courses/<int:pk>/', CourseDetail.as_view(),name='course-detail'),
    path('courses/<int:pk>/lessons/', LessonList.as_view(),name='lesson-list'),
    path('courses/<int:pk>/lessons/<int:lpk>/', LessonDetail.as_view(),name='lesson-detail'),
    path('users/', CustomUserList.as_view(),name='user-list'),
    path('users/<int:pk>/', CustomUserDetail.as_view(),name='user-detail'),
    path('profile/', UserProfileView.as_view(),name='user-profile'),
]
