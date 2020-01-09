from rest_framework import generics, permissions
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404


class CartList(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def perform_create(self, serializer):
        queryset = self.get_queryset()
        queryset = queryset.filter(owner=self.request.user)

        # the cart is only saved when one doesnt already exist.
        if not queryset.exists():
            serializer.save(owner=self.request.user)


class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_object(self):
        queryset = self.get_queryset().filter(owner=self.request.user)
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        self.request
        return obj

    def perform_update(self, serializer):
        item_serializer = ItemSerializer(data=self.request.data)
        item_serializer.is_valid(raise_exception=True)
        item_serializer.save()
