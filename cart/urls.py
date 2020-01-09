from django.urls import path
from cart.views import CartDetail, CartList


urlpatterns = [
    path('cart/new/', CartList.as_view(), name='cart-list'),
    path('cart/', CartDetail.as_view() ,name='cart-detail'),

]
