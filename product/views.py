from django.shortcuts import render
from .models import Product

def index(request):
    # products = Product.objects.all()  # Get all products
    return render(request, 'Normal/index.html')

def shop(request):  
     return render(request, "Normal/shop.html")
 
def prodec(request):
    return render(request, "Normal/product-details.html")

def aboutus(request):
    return render(request, "Normal/About-Us.html")

def club(request):
    return render(request, "Normal/Club.html")