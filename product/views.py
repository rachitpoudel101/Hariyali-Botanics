from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Product, SIZE_CHOICES, Review, ProductImage
import json

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
    product_images = ProductImage.objects.filter(product=product).order_by('-is_primary')
    reviews = product.reviews.all()  # Get all reviews for this product
    similar_products = product.get_similar_products(4)  # Get 4 similar products
    
    # Get the primary image for each similar product
    for similar_product in similar_products:
        primary_image = ProductImage.objects.filter(product=similar_product, is_primary=True).first()
        if not primary_image:
            primary_image = ProductImage.objects.filter(product=similar_product).first()
        similar_product.primary_image = primary_image
    
    return render(request, "Normal/product-details.html", {  
        "product": product,
        "size_choices": SIZE_CHOICES,
        "product_images": product_images,
        "reviews": reviews,
        "similar_products": similar_products,
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

# Remove the csrf_exempt decorator and use ensure_csrf_cookie instead
@ensure_csrf_cookie
def submit_review(request, product_id):
    if request.method == 'POST':
        try:
            product = get_object_or_404(Product, id=product_id)
            
            # Get data from form submission
            reviewer_name = request.POST.get('reviewer_name')
            rating = request.POST.get('rating')
            comment = request.POST.get('comment')
            
            # Create and save the new review
            review = Review(
                product=product,
                reviewer=reviewer_name,
                rating=int(rating),
                comment=comment
            )
            review.save()
            
            # Add success message
            messages.success(request, 'Thank you for your review!')
            
        except Exception as e:
            # Add error message
            messages.error(request, f'Error submitting review: {str(e)}')
    
    # Redirect back to product detail page
    return redirect('prodec', id=product_id)
