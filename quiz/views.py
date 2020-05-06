from django.shortcuts import render
from rest_framework import generics
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer
from .models import Quiz, Question, Option
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
# Create your views here.


class QuizCreate(generics.CreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(lesson__id=self.kwargs['lid'])
        obj = get_object_or_404(queryset)
        # self.check_object_permissions(self.request, obj.lesson.owner)
        self.check_object_permissions(self.request, self.request.user)
        return obj


class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        self.check_object_permissions(self.request, self.request.user)
        quiz = get_object_or_404(
            Quiz.objects.filter(lesson__id=self.kwargs['lid']))
        serializer.save(quiz=quiz)

    def get_queryset(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        # question_id = self.kwargs['qid']
        lesson_id = self.kwargs['lid']
        obj = Question.objects.filter(quiz__lesson__id=lesson_id)
        self.check_object_permissions(self.request, self.request.user)
        return obj

class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(id=self.kwargs['qid']).filter(
            quiz__lesson_id=self.kwargs['lid'])
        obj = get_object_or_404(queryset)
        # self.check_object_permissions(self.request, obj.quiz.lesson.owner)
        self.check_object_permissions(self.request, self.request.user)
        return obj

    def perform_update(self, serializer):
        queryset = Option.objects.filter(owning_question__id=self.kwargs['qid']).filter(
            owning_question__quiz__lesson__id=self.kwargs['lid']).filter(id=self.request.POST.get('answer'))
        if not queryset.exists():
            raise ValidationError({
                "answer": [
                    'The selected answer is not a valid option choice'
                ]
            })
        serializer.save()


class OptionListCreate(generics.ListCreateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

    def get_serializer(self,*args,**kwargs):
        if 'data' in kwargs:
            data = kwargs['data']
            if isinstance(data,list):
                kwargs["many"] = True
        return super(OptionListCreate,self).get_serializer(*args,**kwargs)
    def perform_create(self, serializer):
        self.check_object_permissions(self.request, self.request.user)
        question = get_object_or_404(
            Question.objects.filter(id=self.kwargs['qid']).filter(quiz__lesson_id=self.kwargs['lid']))
        serializer.save(owning_question=question)

    def get_queryset(self):
       # GET PK FROM URL USING KWARGS TO URL DEFINTIIION
        question_id = self.kwargs['qid']
        lesson_id = self.kwargs['lid']
        obj = Option.objects.filter(owning_question__id=question_id).filter(
            owning_question__quiz__lesson__id=lesson_id)
        self.check_object_permissions(self.request, self.request.user)
        return obj


class OptionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

    def get_object(self):
        queryset = self.get_queryset()
        queryset = queryset.filter(owning_question__quiz_id=self.kwargs['qid']).filter(
            owning_question__quiz__lesson_id=self.kwargs['lid']).filter(id=self.kwargs['oid'])
        obj = get_object_or_404(queryset)
        # self.check_object_permissions(self.request, obj.quiz.lesson.owner)
        self.check_object_permissions(self.request, self.request.user)
        return obj
