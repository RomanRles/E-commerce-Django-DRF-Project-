# Create model Serializers here!
from rest_framework import serializers
from .models import Product, Category, ImageProduct, Order, OrderItem, User, Comments

from django.db import transaction

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']


    def validate(self, validated_data):
        data = validated_data
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        data = validated_data
        data.pop('password2')

        user = User.objects.create_user(**data)
        return user
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class ImageProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ImageProduct
        fields = ['image_url']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "comment", "product"]
        read_only_fields = ["product"]


class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    images = ImageProductSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'sku', 'brand', 'price', 'stock', 'rating', 'category', 'images', "comments")


class OrderItemSerializer(serializers.ModelSerializer):
        product_name = serializers.CharField(source='product.title', read_only=True)
        product_price = serializers.DecimalField(
            max_digits=10,
            decimal_places=2,
            source='product.price',
            read_only=True
        )
        product = serializers.PrimaryKeyRelatedField(read_only=True)
        product_id = serializers.PrimaryKeyRelatedField(
            queryset=Product.objects.all(),
            source='product',
            write_only=True
        )
        item_subtotal = serializers.SerializerMethodField()

        def validate(self, attrs):
            product = attrs['product']
            quantity = attrs['quantity']

            if quantity > product.stock:
                raise serializers.ValidationError({
                    "quantity": (
                        f"Only {product.stock} units of "
                        f"{product.title} are available."
                    )
                })

            return attrs

        @transaction.atomic
        def create(self, validated_data):
            order = validated_data['order']
            product = validated_data['product']
            quantity = validated_data['quantity']

            existing_item = OrderItem.objects.filter(
                order=order,
                product=product
            ).first()

            if existing_item:
                existing_item.quantity += quantity
                existing_item.save()
                order_item = existing_item
            else:
                order_item = OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity
                )

            product.stock -= quantity
            product.save(update_fields=['stock'])

            return order_item


        def get_item_subtotal(self, obj):
            return obj.item_subtotal

        class Meta:
            model = OrderItem
            fields = ['product_name', 'product', 'product_price', 'product_id', 'quantity', 'item_subtotal']


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta: 
        model = Order
        fields = ['id', 'user', 'created_at', 'status', 'total_price', 'items']
        read_only_fields = [
            "id",
            "user",
            "created_at",
            "status",
            "total_price",
            "items",
        ]
