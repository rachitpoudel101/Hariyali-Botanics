from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import (
    Product,
    SIZE_CHOICES,
    Review,
    ProductImage,
    CustomerResult,
    Benefits,
    HowToUse,
    Ingredients,
    Category,
)
from hero.models import Hero
from ShopByConcern.models import ShopByConcern
from guides.models import Guide, FAQ
from Review.models import CustomerReview
from blog.models import Blog  


def index(request):
    try:
        hero_video = Hero.objects.last()
        video_url = hero_video.video.url if hero_video and hero_video.video else None
        hero_title = hero_video.title if hero_video else ""
        hero_description = hero_video.description if hero_video else ""
        products = Product.objects.all().order_by("-id")[:6]
        concerns = ShopByConcern.objects.all()
        guides = Guide.objects.all()[:5]  
        reviews = CustomerReview.objects.all()
        blogs = Blog.objects.all().order_by("-id")[:4]  
        return render(
            request,
            "Normal/index.html",
            {
                "products": products,
                "video_url": video_url,
                "hero_title": hero_title,
                "hero_description": hero_description,
                "concerns": concerns,
                "guides": guides,  
                "reviews": reviews,  
                "blogs": blogs,  
            },
        )
    except Exception:
        return render(
            request,
            "Normal/index.html",
            {
                "products": [],
                "video_url": None,
                "hero_title": "",
                "hero_description": "",
                "concerns": ShopByConcern.objects.all(),
                "guides": Guide.objects.all()[:5],
                "reviews": CustomerReview.objects.all(),  
                "blogs": Blog.objects.all().order_by("-id")[:4],  
            },
        )


def shop(request):
    filter_param = request.GET.get("filter")
    concern_id = request.GET.get("concern")
    category_id = request.GET.get("category")

    products = Product.objects.all()

    if concern_id:
        products = products.filter(shopbyconcern__id=concern_id)
    if filter_param == "bestsellers":
        products = products.filter(best_seller=True)
    if category_id:
        products = products.filter(category__id=category_id)

    concerns = ShopByConcern.objects.all()
    categories = Category.objects.all()  

    return render(
        request,
        "Normal/shop.html",
        {
            "products": products,
            "active_filter": filter_param,
            "concerns": concerns,
            "categories": categories,  
            "active_concern": concern_id,
            "active_category": category_id,
        },
    )


def prodec(request, id):
    product = get_object_or_404(Product, id=id)
    product_images = ProductImage.objects.filter(product=product).order_by(
        "-is_primary"
    )
    reviews = product.reviews.all()
    similar_products = product.get_similar_products(4)
    for similar_product in similar_products:
        primary_image = ProductImage.objects.filter(
            product=similar_product, is_primary=True
        ).first()
        if not primary_image:
            primary_image = ProductImage.objects.filter(product=similar_product).first()
        similar_product.primary_image = primary_image

    customer_results = CustomerResult.objects.filter(product=product)
    benefits = Benefits.objects.filter(product=product)
    how_to_use = HowToUse.objects.filter(product=product)
    ingredients = Ingredients.objects.filter(product=product)

    return render(
        request,
        "Normal/product-details.html",
        {
            "product": product,
            "size_choices": SIZE_CHOICES,
            "product_images": product_images,
            "reviews": reviews,
            "similar_products": similar_products,
            "customer_results": customer_results,
            "benefits": benefits,
            "how_to_use": how_to_use,
            "ingredients": ingredients,
        },
    )


def aboutus(request):
    return render(request, "Normal/About-Us.html")


def club(request):
    return render(request, "Normal/Club.html")


def guide(request):
    guides = Guide.objects.all()
    faqs = FAQ.objects.all()
    return render(
        request,
        "Normal/Guide.html",
        {
            "guides": guides,
            "faqs": faqs,
        },
    )


def aayutreat(request):
    return render(request, "Normal/aayutreat.html")


def quiz(request):
    return render(request, "Normal/Quiz.html")


@ensure_csrf_cookie
def submit_review(request, product_id):
    if request.method == "POST":
        try:
            product = get_object_or_404(Product, id=product_id)

            reviewer_name = request.POST.get("reviewer_name")
            rating = request.POST.get("rating")
            comment = request.POST.get("comment")

            review = Review(
                product=product,
                reviewer=reviewer_name,
                rating=int(rating),
                comment=comment,
            )
            review.save()

            messages.success(request, "Thank you for your review!")

        except Exception as e:
            messages.error(request, f"Error submitting review: {str(e)}")

    return redirect("prodec", id=product_id)


def guides_list(request):
    guides = Guide.objects.all()
    return render(
        request,
        "base/guides.html",
        {
            "guides": guides,
        },
    )


def guide_detail(request, guide_id):
    guide = get_object_or_404(Guide, id=guide_id)
    modules = guide.modules.all()
    faqs = guide.faqs.all()
    customer_says = guide.customer_says.all()
    if request.method == "POST":
        try:
            rating = int(request.POST.get("rating"))
            comment = request.POST.get("comment")

            review = Review.objects.create(
                guide=guide,
                user=request.user,
                rating=rating,
                comment=comment,
            )
            review.save()

            messages.success(request, "Thank you for your review!")
        except Exception as e:
            messages.error(request, f"Error submitting review: {e}")

        return redirect("guide_detail", guide_id=guide_id)
    return render(
        request,
        "base/guide-detail.html",
        {
            "guide": guide,
            "modules": modules,
            "faqs": faqs,
            "customer_says": customer_says,
        }
    )
