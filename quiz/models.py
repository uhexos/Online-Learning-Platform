from django.db import models
from courses.models import Lesson
# Create your models here.
# quiz


class Quiz(models.Model):
    title = models.CharField(max_length=150, help_text='Enter quiz title')
    lesson = models.OneToOneField(
        Lesson, on_delete=models.CASCADE, related_name="quiz")

class Question(models.Model):
    prompt = models.TextField(help_text='Enter question prompt ')
    quiz = models.ForeignKey("Quiz", on_delete=models.CASCADE, related_name="questions")
    answer = models.OneToOneField("Option", on_delete=models.CASCADE, null=True)

class Option(models.Model):
    prompt = models.TextField(help_text='Enter option prompt ')
    owning_question = models.ForeignKey("Question", on_delete=models.CASCADE, related_name="options")
    

# question
# choices
