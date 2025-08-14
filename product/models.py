from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, null=True,blank=False, default=None)
    description =  models.CharField(max_length=150,null=True, default=None)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product/images/', null=True, blank=True) 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    best_seller = models.BooleanField(default=False)

    def __str__(self):
        return self.name