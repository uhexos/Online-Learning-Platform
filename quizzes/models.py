from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Lesson

User = get_user_model()


class Choice(models.Model):
    text = models.CharField(max_length=150)
    question = models.ForeignKey('Question', related_name='choices',on_delete=models.CASCADE)

    def __str__(self):
        return self.text

class Question_Answer(models.Model):
    question = models.OneToOneField('Question',on_delete=models.CASCADE,related_name='correct_answer',)
    answer = models.OneToOneField('Choice', on_delete=models.CASCADE,
                                   null=True, blank=True)
class Question(models.Model):
    question_text = models.CharField(max_length=150)
    # answer = models.OneToOneField('Question_Answer', on_delete=models.CASCADE,
    #                               related_name='correct_answer', null=True, blank=True)
    quiz = models.ForeignKey('Quiz', blank=True,on_delete=models.CASCADE,related_name='questions')

    def __str__(self):
        return self.question_text


class Quiz(models.Model):
    quiz_name = models.CharField(max_length=150)
    lesson  = models.OneToOneField(Lesson,on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Quizzes'

    def __str__(self):
        return self.quiz_name
