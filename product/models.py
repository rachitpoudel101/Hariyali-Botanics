from django.db import models

SIZE_CHOICES = [
    ('30ml', '30 mL'),
    ('50ml', '50 mL'),
]

class Category(models.Model):
    name = models.CharField(max_length=50, null=True, blank=False, default=None)
    description = models.CharField(max_length=150, null=True, default=None)

    def __str__(self):
        return self.name

class Skintype(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    image = models.ImageField(upload_to="product/images/", null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.FloatField(null=True, blank=True)
    external_url = models.URLField(null=True, blank=True)
    best_seller = models.BooleanField(default=False)
    skin_types = models.ManyToManyField(Skintype, related_name="products", blank=True)
    is_active = models.BooleanField(default=True) 
    reviews_count = models.IntegerField(default=0)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='30ml')

    def __str__(self):
        return self.name
