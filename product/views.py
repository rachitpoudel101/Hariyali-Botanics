from django.shortcuts import render, get_object_or_404
from .models import Product, SIZE_CHOICES

def index(request):
    
    products = Product.objects.all().order_by('-id')[:6]  
    return render(request, "Normal/index.html", {"products": products})

def shop(request): 
    filter_param = request.GET.get("filter")
    products = Product.objects.all()
    if filter_param == "bestsellers":
        products = products.filter(best_seller=True)
    return render(request, "Normal/shop.html", {"products": products, "active_filter": filter_param})

def prodec(request, id):
    product = get_object_or_404(Product, id=id)
    return render(request, "Normal/product-details.html", {
        "product": product,
        "size_choices": SIZE_CHOICES,
    })

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
