from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from .models import Product

def index(request):
    
    products = Product.objects.all().order_by('-id')[:6]  # Top 6 newest products
    return render(request, "Normal/index.html", {"products": products})

def shop(request): 
    products = Product.objects.all()  
    return render(request, "Normal/shop.html", {"products": products})

def prodec(request):
    product = get_object_or_404(Product, id=id)
    return render(request, "Normal/product-details.html", {"product": product})

def aboutus(request):
    return render(request, "Normal/About-Us.html")

def club(request):
    return render(request, "Normal/Club.html")

def guide(request):
    return render(request, "Normal/Guide.html")

def aayutreat(request):
    return render(request, "Normal/aayutreat.html")

def quiz(request):
    return render(request, "Normal/Quiz.html")
