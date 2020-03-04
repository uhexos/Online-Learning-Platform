from django_filters import rest_framework as filters
from .models import Course


class CourseFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    min_rating = filters.NumberFilter(field_name="rating__score", lookup_expr='gte')

    class Meta:
        model = Course
        fields = ['category', 'min_price', 'max_price','min_rating']
