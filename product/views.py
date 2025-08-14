from django.shortcuts import render
from .models import Product

def index(request):
    products = Product.objects.all()  # Get all products
    return render(request, 'Normal/index.html', {'products': products})
