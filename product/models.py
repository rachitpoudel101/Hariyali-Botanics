from django.db import models
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
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    image = models.ImageField(upload_to="product/images/", null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    best_seller = models.BooleanField(default=False)
    skin_types = models.ManyToManyField(Skintype, related_name="products", blank=True)
    is_active = models.BooleanField(default=True) 

    def __str__(self):
        return self.name
