from rest_framework import generics, permissions
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from courses.models import Course
from .cart_exceptions import ItemAlreadyExists

 
class CartList(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def perform_create(self, serializer):
        queryset = self.get_queryset()
        queryset = queryset.filter(owner=self.request.user)

        # the cart is only saved when one doesnt already exist.
        if not queryset.exists():
            serializer.save(owner=self.request.user)


class CartDetail(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_object(self):
        queryset = self.get_queryset().filter(owner=self.request.user)
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj


class ItemCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.filter(cart__owner=self.request.user)

    def perform_create(self, serializer):
        queryset = self.get_queryset().filter(cart__owner=self.request.user,
                                              course=self.request.POST.get('course', ""))
        if queryset.exists():
            obj = get_object_or_404(queryset)
            raise ItemAlreadyExists()
        else:
            # TODO set course price so that it updates in  carts if there is a price change
            cart = Cart.objects.get(owner=self.request.user)
            course = Course.objects.get(id=self.request.POST.get('course', ""))
            serializer.save(quantity=1, cart=cart, course=course)


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
