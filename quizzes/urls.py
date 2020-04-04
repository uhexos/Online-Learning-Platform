from django.urls import path
from .views import QuizList,QList
urlpatterns = [
    # path('cart/new/', CartList.as_view(), name='cart-list'),
    path('quizzes/', QuizList.as_view(),name="quiz-list"),
    path('quizzes/q/', QList.as_view(),name="quiz-list"),
]