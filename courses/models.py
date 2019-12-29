from django.db import models
from django.conf import settings
from datetime import date
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Course(models.Model):
    title = models.CharField(max_length=150, help_text='Enter course title')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    description = models.TextField(
        max_length=1000, help_text='Enter a brief description of the course')
    pub_date = models.DateField(null=True, default=date.today)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, related_name='category')
    is_live = models.BooleanField(default=0)
    rating = models.IntegerField(default=0)
    thumbnail = models.ImageField(
        help_text='Enter course thumbnail', null=True ,upload_to='course_thumbnails')
    price = models.DecimalField(max_digits=8, decimal_places=2,default="0.0")
    def __str__(self):
        return self.title


class Lesson(models.Model):
    title = models.CharField(max_length=150, help_text='Enter lesson title')
    video = models.FileField(
        help_text='Enter course video', null=True, upload_to="lesson_videos" )
    content = models.TextField(help_text='Enter lesson text ', null=True)
    pub_date = models.DateField(null=True, blank=True)
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE, related_name='lessons')
    description = models.TextField(
        max_length=1000, help_text='Enter a brief description of the lesson')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=150, help_text='Enter category title')
    create_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title


class EnrolledCourses(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)


class Comments(models.Model):
    text = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE)
    date = models.DateField()

    def __str__ (self):
        return self.text

class CustomUser(AbstractUser):
    is_tutor = models.BooleanField(default=False)
    # add additional fields in here

    def __str__(self):
        return self.username