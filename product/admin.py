from django.contrib import admin

from .models import Product, Skintype, Category
admin.site.register(Product)
admin.site.register(Skintype)
admin.site.register(Category)