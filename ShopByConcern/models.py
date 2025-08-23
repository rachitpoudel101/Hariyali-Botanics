from django.db import models

# Create your models here.


class ShopByConcern(models.Model):
    title = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="shop_by_concern/")

    def __str__(self):
        return self.title
