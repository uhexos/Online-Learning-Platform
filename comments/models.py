from django.db import models
from django.conf import settings
from courses.models import Lesson
from datetime import date
# Create your models here.

class Comments(models.Model):
    text = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    date = models.DateField(null=True, default=date.today)

    def __str__(self):
        return self.text