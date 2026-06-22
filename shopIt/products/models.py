# Create your models here.
from django.db import models


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