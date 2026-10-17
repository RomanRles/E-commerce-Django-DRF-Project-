from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

from .models import Product, Category, ImageProduct, Order, OrderItem, Comments
from .serializers import ProductSerializer, CategorySerializer, ImageProductSerializer, OrderSerializer, OrderItemSerializer, RegisterSerializer, CommentSerializer
from products.filters import ProductFilter, OrderFilter

class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# Create and List Products
class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter,
        filters.OrderingFilter,
        ]
    search_fields = ['title', 'description', 'category']
    ordering_fields = ['title', 'price', 'stock']
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


# Detail Product
class ProductDetailListAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product = get_object_or_404(
            Product,
            pk=self.kwargs["product_id"]
        )

        serializer.save(product=product)


# List and Create Orders
class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = OrderFilter
    filter_backends = [
            DjangoFilterBackend, 
            filters.OrderingFilter,
            ]
    ordering_fields = [
        'created_at',
        'total_price',
        'status'
    ]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderItemListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(
            order__id=self.kwargs["order_id"],
            order__user=self.request.user
        )

    def perform_create(self, serializer):
        order = get_object_or_404(
            Order,
            pk=self.kwargs["order_id"],
            user=self.request.user
        )

        serializer.save(order=order)


# Detail Order
class OrderDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
