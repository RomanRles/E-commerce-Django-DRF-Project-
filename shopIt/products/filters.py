import django_filters
from products.models import Product, Order

class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(
        field_name='category__name',
        lookup_expr='iexact'
    )
    
    class Meta:
        model = Product
        fields = {
            'title': ['iexact', 'icontains'], 
            'price': ['exact', 'lt', 'gt', 'range'],
        }


class OrderFilter(django_filters.FilterSet):
    class Meta: 
        model = Order
        fields = ['status']
