# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

from decimal import Decimal


class User(AbstractUser):
    pass


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    external_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    sku = models.CharField(max_length=100, unique=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    rating = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default=0
        )
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.title



class ImageProduct(models.Model):
    product = models.ForeignKey(
        'Product', 
        on_delete=models.CASCADE, 
        related_name='images'
        )
    image_url = models.URLField()
    is_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.title}"


class Comments(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    comment = models.TextField()


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('paid', 'Paid'),
            ('shipped', 'Shipped'),
            ('cancelled', 'Cancelled'),
        ],
        default='pending'
    )
    products = models.ManyToManyField(Product, through='OrderItem', related_name='orders')

    @property
    def total_price(self):
        return sum(
            (item.item_subtotal
            for item in self.items.all()),
            Decimal('0.00')
        )

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def item_subtotal(self):
        return self.product.price * self.quantity