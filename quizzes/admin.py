from django.contrib import admin

# Register your models here.
# from .models import Quiz
from .models import Choice, Question, Quiz,Question_Answer

admin.site.register(Question)
admin.site.register(Question_Answer)
admin.site.register(Choice)
admin.site.register(Quiz)