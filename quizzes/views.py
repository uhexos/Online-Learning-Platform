from django.shortcuts import render
from .models import Quiz,Question
from .serializers import QuizSerializer,QuestionSerializer
from rest_framework import generics


# Create your views here.
class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    # permission_classes = [IsSuperUser | IsAdminUser]


class QList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = [IsSuperUser | IsAdminUser]
