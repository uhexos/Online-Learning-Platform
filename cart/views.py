from rest_framework import generics, permissions
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from courses.models import Course,EnrolledCourses
from .cart_exceptions import ItemAlreadyExists
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.http import HttpResponse, JsonResponse


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


class VerifyPaymentView(APIView):
    # TODO remember to add a way of removing old carts either delete em or add a field that indocates used which ever is easier.
    def post(self, request, format=None):
        data = {
            # this is the reference from the payment button response after customer paid.
            "txref": request.data['txref'],
            # this is the secret key of the pay button generated
            "SECKEY": "FLWSECK_TEST-e853b5a5070cf5635c15276446b26aed-X"
        }
        url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify"
        response = requests.post(url, data=data)
        response = response.json()
        if response['status'] == 'success':
          # confirm that the amount for that transaction is the amount you wanted to charge
            if response['data']['chargecode'] == '00':
                sum = Cart.objects.filter(id=response['data']['meta'][0]['metavalue']).aggregate(
                    Sum('items__course__price'))
                if response['data']['amount'] >= sum['items__course__price__sum']:
                    print("Payment successful then give value")
                    cart = Cart.objects.get(id=response['data']['meta'][0]['metavalue'])
                    items = cart.items.all()
                    for item in items:
                        print("**1")
                        course = Course.objects.get(id = item.course_id)
                        enrolled = EnrolledCourses(
                            user=self.request.user, course=course)
                        enrolled.save()
                    items.delete()
                    return HttpResponse(status=200)

        return HttpResponse(status=400)
