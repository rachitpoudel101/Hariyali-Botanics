from django.db import models
from product.models import Skintype, Product
from ShopByConcern.models import ShopByConcern


class CustomerQuizLog(models.Model):
    class AgeRange(models.TextChoices):
        RANGE_18_25 = "18-25", "18-25"
        RANGE_26_35 = "26-35", "26-35"
        RANGE_36_45 = "36-45", "36-45"
        RANGE_46_55 = "46-55", "46-55"
        RANGE_56_PLUS = "56+", "56+"

    class PriceRange(models.TextChoices):
        UNDER_100 = "under_100", "Under 100"
        RANGE_100_300 = "100_300", "100–300"
        OVER_300 = "over_300", "300+"

    name = models.CharField(max_length=200)
    age_range = models.CharField(
        max_length=10, choices=AgeRange.choices, blank=True, null=True
    )
    skin_type = models.ForeignKey(
        Skintype, on_delete=models.SET_NULL, blank=True, null=True
    )
    skin_concern = models.ForeignKey(
        ShopByConcern, on_delete=models.SET_NULL, blank=True, null=True
    )
    price_range = models.CharField(
        max_length=10, choices=PriceRange.choices, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name
