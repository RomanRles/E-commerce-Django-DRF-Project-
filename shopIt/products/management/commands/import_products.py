# Create imports for products
from django.core.management.base import BaseCommand
from products.services.importer import fetch_products

class Command(BaseCommand):
    help = "Imports products from DummyJSON API"

    def handle(self, *args, **options):

        products = fetch_products()

        if not products:
            self.stdout.write(self.style.ERROR("No products fetched"))
            return

        self.stdout.write(
            self.style.SUCCESS(f"Downloaded {len(products)} products")
        )

        # Debug output (Phase 1 only)
        self.stdout.write("First product:\n")
        self.stdout.write(str(products[0]))