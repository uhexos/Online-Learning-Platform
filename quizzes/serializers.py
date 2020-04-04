from rest_framework import serializers

from .models import Choice, Question, Quiz, Question_Answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question_Answer
        fields = ['answer']


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(read_only=True, many=True)
    correct_answer = AnswerSerializer(read_only=True)

    class Meta:
        model = Question
        # fields = ['question_text', 'choices']

        fields = "__all__"

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(read_only=True, many=True)

    class Meta:
        model = Quiz
        # fields = ('question_text', 'choices')
        fields = "__all__"
