from django.contrib import admin
from .models import (
    Product,
    Skintype,
    Category,
    ProductImage,
    Review,
    CustomerResult,
    Benefits,
    HowToUse,
    Ingredients,
)

admin.site.register(Product)
admin.site.register(Skintype)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Review)
admin.site.register(CustomerResult)
admin.site.register(Benefits)
admin.site.register(HowToUse)
admin.site.register(Ingredients)
