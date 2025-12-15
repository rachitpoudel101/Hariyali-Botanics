from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from ShopByConcern.models import ShopByConcern


class Category(models.Model):
    class Meta:
        db_table = "category"

    name = models.CharField(max_length=50, null=True, blank=False, default=None)
    description = models.CharField(max_length=150, null=True, default=None)

    def __str__(self):
        return self.name


class Skintype(models.Model):
    class Meta:
        db_table = "skintype"

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Product(models.Model):
    class Meta:
        db_table = "product"

    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    # image = models.ImageField(upload_to="product/images/", null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.FloatField(null=True, blank=True)
    external_url = models.URLField(null=True, blank=True)
    best_seller = models.BooleanField(default=False)
    skin_types = models.ManyToManyField(Skintype, related_name="products", blank=True)
    is_active = models.BooleanField(default=True)
    review_count = models.IntegerField(default=0)
    size = models.CharField(max_length=10, null=True, blank=True)
    similar_products = models.ManyToManyField(
        "self", symmetrical=False, blank=True, related_name="related_to"
    )
    shopbyconcern = models.ManyToManyField(
        ShopByConcern, related_name="products", blank=True
    )

    def __str__(self):
        return self.name

    @property
    def reviews_count(self):
        # Provide a property that returns review_count for compatibility
        return self.review_count

    def get_similar_products(self, count=4):
        """Get similar products based on explicitly defined similar_products,
        or products from the same category if none are explicitly defined"""
        # First check for explicitly defined similar products
        similar = list(self.similar_products.filter(is_active=True))

        # If we don't have enough, get products from the same category
        if len(similar) < count:
            category_products = list(
                Product.objects.filter(category=self.category, is_active=True).exclude(
                    id=self.id
                )
            )

            # Add products from the same category that aren't already in similar
            for product in category_products:
                if product not in similar and len(similar) < count:
                    similar.append(product)

        # Return only the requested count
        return similar[:count]

    # Add a helper for quiz filtering
    @staticmethod
    def filter_for_quiz(skin_type=None, concerns=None, budget=None):
        qs = Product.objects.filter(is_active=True)
        if skin_type:
            qs = qs.filter(skin_types__name__iexact=skin_type)
        if concerns:
            for concern in concerns:
                qs = qs.filter(shopbyconcern__name__iexact=concern)
        if budget == "low":
            qs = qs.filter(price__lt=60)
        elif budget == "medium":
            qs = qs.filter(price__lt=100)
        # For "high", no price filter
        return qs.distinct()


class ProductImage(models.Model):
    class Meta:
        db_table = "product_image"
        ordering = ["-is_primary", "id"]  # primary images first

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="product/images/", null=True, blank=True)
    is_primary = models.BooleanField(default=False)


class Review(models.Model):
    class Meta:
        db_table = "review"

    reviewer = models.CharField(max_length=100, blank=True, null=True)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    rating = models.IntegerField()
    comment = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product}"


# Add signals to update review count
@receiver(post_save, sender=Review)
def update_review_count_on_save(sender, instance, created, **kwargs):
    if created:  # Only increment if it's a new review
        product = instance.product
        product.review_count += 1
        product.save(update_fields=["review_count"])


@receiver(post_delete, sender=Review)
def update_review_count_on_delete(sender, instance, **kwargs):
    product = instance.product
    product.review_count = max(
        0, product.review_count - 1
    )  # Ensure count doesn't go negative
    product.save(update_fields=["review_count"])


class CustomerResult(models.Model):
    class Meta:
        db_table = "customer_result"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    result = models.TextField()
    image = models.ImageField(upload_to="customer/results/", null=True, blank=True)


class Benefits(models.Model):
    class Meta:
        db_table = "product_benefits"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    benefit = models.TextField()
    image = models.ImageField(upload_to="product/benefits/", null=True, blank=True)


class HowToUse(models.Model):
    class Meta:
        db_table = "how_to_use"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    step = models.TextField()
    image = models.ImageField(upload_to="product/how_to_use/", null=True, blank=True)


class Ingredients(models.Model):
    class Meta:
        db_table = "product_ingredients"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ingredient = models.TextField()
    image = models.ImageField(upload_to="product/ingredients/", null=True, blank=True)
