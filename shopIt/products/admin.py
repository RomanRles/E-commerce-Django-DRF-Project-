from django.contrib import admin
from.models import Category, Product, ImageProduct, Order, OrderItem, User, Comments

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ImageProduct)

class OrderItemInline(admin.TabularInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderItemInline
    ]
admin.site.register(Order, OrderAdmin)
admin.site.register(User)
admin.site.register(Comments)

