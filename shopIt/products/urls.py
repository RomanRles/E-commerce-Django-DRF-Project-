from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListCreateAPIView.as_view()),
    path('products/<int:pk>/', views.ProductDetailListAPIView.as_view()),
    path('products/<int:product_id>/comments/', views.CommentCreateAPIView.as_view()),
    path('orders/', views.OrderListCreateAPIView.as_view()),
    path('orders/<int:order_id>/items/', views.OrderItemListCreateAPIView.as_view()),
    path('orders/<int:pk>/', views.OrderDetailAPIView.as_view(), name='order-detail'),
    path('register/', views.RegisterAPIView.as_view()),
]