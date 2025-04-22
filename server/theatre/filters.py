from django_filters import rest_framework as filters
from django_filters import DateFromToRangeFilter
from theatre.models import Session

class SessionFilter(filters.FilterSet):
    theatre = filters.NumberFilter(field_name='theatre__id')
    genre = filters.NumberFilter(field_name='genre__id')
    price_min = filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = filters.NumberFilter(field_name='price', lookup_expr='lte')
    date_range = DateFromToRangeFilter(field_name='date_time', label="Date Range (YYYY-MM-DD)")

    class Meta:
        model = Session
        fields = {
            'theatre': ['exact'],
            'genre': ['exact'],
            'price': ['gte', 'lte', 'exact'],
            'date_time': ['exact', 'gte', 'lte'],
        }