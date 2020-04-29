from django.urls import path
from .views import QuizCreate,QuizDetail,QuestionListCreate,QuestionDetail,OptionListCreate,OptionDetail
urlpatterns = [
    # path('cart/new/', CartList.as_view(), name='cart-list'),
    path('quiz/', QuizCreate.as_view(),name="quiz-create"),
    path('quiz/<int:lid>/', QuizDetail.as_view(),name="quiz-create"),
    path('quiz/<int:lid>/questions/', QuestionListCreate.as_view(),name="question-list-create"),
    path('quiz/<int:lid>/questions/<int:qid>/', QuestionDetail.as_view(),name="question-detail"),
    path('quiz/<int:lid>/questions/<int:qid>/options/', OptionListCreate.as_view(),name="option-list-create"),
    path('quiz/<int:lid>/questions/<int:qid>/options/<int:oid>/', OptionDetail.as_view(),name="option-detail       "),
    # path('quiz/<int:lid>/update', QuizUpdate.as_view(),name="quiz-update"),
]
