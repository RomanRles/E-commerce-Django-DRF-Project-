# Connects with the External API to import products into the system.

import requests

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

        print(f"Downloaded {len(products)} products")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching products: {e}")
        return []

    if products:
        print(f"Product 1: {products[0]}")

    return products
