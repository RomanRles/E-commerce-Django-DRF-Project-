# Connects with the External API to import products into the system.

import requests
from products.models import Product, Category, ImageProduct

def fetch_products():
    """
    Code to connect with the External API and import products
    """

    url = "https://dummyjson.com/products"
    products = []

    try:
        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            print(f"Failed to fetch API resources: {response.status_code}")
            return []

        data = response.json()
        products = data.get("products", [])
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching products: {e}")
        return []

    if products:

       # Track imported | created resources
       created_products = 0
       updated_products = 0 
       created_categories = 0 
       created_images = 0
       skipped_images = 0

       # For each product Instantiate models and save to the database
       for product_data in products:
            category, cat_created = Category.objects.get_or_create(
                name=product_data['category']
            )

            if cat_created:
                created_categories += 1

            product_obj, prod_created = Product.objects.update_or_create(
                external_id=product_data['id'],
                defaults={
                    'title': product_data['title'],
                    'description': product_data['description'],
                    'category': category,
                    'price': product_data['price'],
                    'rating': product_data['rating'],
                    'stock': product_data['stock'],
                    'brand': product_data.get('brand'),
                    'sku': product_data['sku'],                 
                }
            )

            if prod_created:
                created_products += 1
            else: 
                updated_products += 1

            for image_url in product_data.get('images', []):
                img_obj, img_created = ImageProduct.objects.get_or_create(
                    product=product_obj,
                    image_url=image_url
                )
            
            if img_created: 
                created_images += 1
            else: 
                skipped_images += 1

    print(f"Processed Products: {len(products)}:")
    print(f"New Products: {created_products} {'No new products' if created_products == 0 else ''}")
    print(f"Updated Products: {updated_products}")
    print(f"New Categories: {created_categories} {'No new categories' if created_categories == 0 else ''}")
    print(f"New Images: {created_images}")
    print(f"Skipped Images (Avoid Dupplication): {skipped_images}")

            
    return created_products
