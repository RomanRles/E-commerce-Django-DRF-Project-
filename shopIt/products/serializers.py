# Create model Serializers here!
from rest_framework import serializers
from .models import Product, Category, ImageProduct, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class ImageProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ImageProduct
        fields = ['image_url']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ImageProductSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'sku', 'brand', 'price', 'stock', 'rating', 'category', 'images')



class OrderItemSerializer(serializers.ModelSerializer):
        product = ProductSerializer(read_only=True)
        product_id = serializers.PrimaryKeyRelatedField(
            queryset=Product.objects.all(),
            source='product',
            write_only=True
        )

        class Meta:
            model = OrderItem
            fields = ['product', 'product_id', 'quantity', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    items = OrderItemSerializer(many=True)

    class Meta: 
        model = Order
        fields = ['id', 'user', 'created_at', 'status', 'total_price', 'items']

