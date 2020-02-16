from django.urls import path

urlpatterns = [
    path('cart/new/', CartList.as_view(), name='cart-list')
]
