from django.urls import path
from .views import SalesList
urlpatterns = [
    # path('cart/new/', CartList.as_view(), name='cart-list'),
    path('reports/sales/', SalesList.as_view(),name="sales-list"),
   
]
