from rest_framework import serializers
from .models import Quiz, Question, Option


class OptionSerializer(serializers.ModelSerializer):
    owning_question = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Option
        # fields = ['id', 'title', 'create_date']
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(read_only=True,many=True)
    # answer = serializers.ChoiceField(choices = GEEKS_CHOICES) 
    class Meta:
        model = Question
        fields = ['id','prompt','options','answer']
        # fields = '__all__'
        # exclude = ["quiz"]

class QuizSerializer(serializers.ModelSerializer):
    questions =QuestionSerializer(read_only=True,many=True)

    class Meta:
        model = Quiz
        # fields = ['id', 'title', 'create_date']
        fields = '__all__'

