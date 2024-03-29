from django.db import models
from django.conf import settings
from datetime import date
from django.contrib.auth.models import AbstractUser
# Create your models here.

# TODO use imagekit to resize thumbnail upon upload


class Course(models.Model):
    title = models.CharField(max_length=150, help_text='Enter course title')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='courses'
    )
    description = models.TextField(
        max_length=1000, help_text='Enter a brief description of the course')
    pub_date = models.DateField(null=True, default=date.today)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, related_name='category')
    is_live = models.BooleanField(default=0)
    thumbnail = models.ImageField(
        help_text='Enter course thumbnail', null=True, upload_to='course_thumbnails', default='default_course_img.jpg')
    price = models.DecimalField(null=False, max_digits=8, decimal_places=2)

    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-pub_date']


class Lesson(models.Model):
    title = models.CharField(max_length=150, help_text='Enter lesson title')
    video = models.FileField(
        help_text='Enter course video', null=True, upload_to="lesson_videos")
    content = models.TextField(help_text='Enter lesson text ', null=True)
    pub_date = models.DateField(default=date.today)
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
    title = models.CharField(
        max_length=150, help_text='Enter category title', unique=True)
    create_date = models.DateField(null=True, blank=True, default=date.today)
    description = models.TextField(
        max_length=1000, help_text='Enter a brief description of the category')

    def __str__(self):
        return self.title


class EnrolledCourses(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE,related_name="enrolled_course")
    course = models.ForeignKey('Course', on_delete=models.CASCADE,related_name="bought_courses")
    pub_date = models.DateField(null=True, default=date.today)


class CustomUser(AbstractUser):
    is_tutor = models.BooleanField(default=False, null=True)
    about = models.TextField(null=True, blank=True)

    # add additional fields in here

    def __str__(self):
        return self.username


class CourseRating(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE, related_name="rating")
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ('owner', 'course',)

    def __str__(self):
        return self.score
