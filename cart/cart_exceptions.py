from rest_framework.exceptions import APIException

class ItemAlreadyExists(APIException):
    status_code = 500
    default_detail = 'Error item already in cart update the cart instead'
    default_code = 'service_unavailable'