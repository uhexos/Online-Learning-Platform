from django.urls import path
from cart.views import CartDetail, CartList,ItemCreate,ItemDetail


urlpatterns = [
    path('cart/new/', CartList.as_view(), name='cart-list'),
    path('cart/', CartDetail.as_view() ,name='cart-detail'),
    path('cart/add/', ItemCreate.as_view() ,name='cart-add'),
    path('cart/item/<int:pk>/', ItemDetail.as_view() ,name='item-detail'),
    path('cart/items/', ItemCreate.as_view() ,name='item-list'),
]
