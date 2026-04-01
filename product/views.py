from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import (
    Product,
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
from django.http import JsonResponse
from product.models import Product, Skintype
from ShopByConcern.models import ShopByConcern
from quiz.models import CustomerQuizLog, Quiz, QuizImage, QuizQuestion, QuizChoice
from ayuretreat.models import AyureTreat, RetreatHighlight, ProgramDay, Whoisitfor
from django.http import Http404

from django.views.decorators.csrf import csrf_exempt

from django.core import serializers


def index(request):
    try:
        hero_video = Hero.objects.last()
        video_url = hero_video.video.url if hero_video and hero_video.video else None
        hero_title = hero_video.title if hero_video else ""
        hero_description = hero_video.description if hero_video else ""
        
        # Use raw SQL to handle decimal conversion errors
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id FROM product 
                WHERE is_active = 1 
                ORDER BY id DESC 
                LIMIT 6
            """)
            product_ids = [row[0] for row in cursor.fetchall()]
        
        products = []
        for pid in product_ids:
            try:
                products.append(Product.objects.get(id=pid))
            except Exception:
                continue
        
        concerns = ShopByConcern.objects.all()
        guides = Guide.objects.all()[:5]
        reviews = CustomerReview.objects.all()
        blogs = Blog.objects.all().order_by("-id")[:4]
        retreats = AyureTreat.objects.filter(is_deleted=False)
        categories = Category.objects.all()

        # Fetch the latest active quiz and its images (up to 4)
        quiz = Quiz.objects.filter(is_active=True).order_by("-id").first()
        quiz_images = quiz.images.all()[:4] if quiz else []

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
                "retreats": retreats,
                "categories": categories,
                "quiz": quiz,
                "quiz_images": quiz_images,
            },
        )
    except Exception as e:
        # Log the error for debugging
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error in index view: {str(e)}")
        
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
                "retreats": AyureTreat.objects.filter(is_deleted=False),
                "categories": Category.objects.all(),
                "quiz": None,
                "quiz_images": [],
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
    categories = Category.objects.all()  # Ensure categories are fetched

    return render(
        request,
        "Normal/shop.html",
        {
            "products": products,
            "active_filter": filter_param,
            "concerns": concerns,
            "categories": categories,  # Pass categories to the template
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
    categories = Category.objects.all()

    return render(
        request,
        "Normal/product-details.html",
        {
            "product": product,
            "size": product.size,
            "product_images": product_images,
            "reviews": reviews,
            "similar_products": similar_products,
            "customer_results": customer_results,
            "benefits": benefits,
            "how_to_use": how_to_use,
            "ingredients": ingredients,
            "categories": categories,
        },
    )


def aboutus(request):
    categories = Category.objects.all()
    return render(request, "Normal/About-Us.html", {"categories": categories})


def club(request):
    categories = Category.objects.all()
    return render(request, "Normal/Club.html", {"categories": categories})


def guide(request):
    guides = Guide.objects.all()
    faqs = FAQ.objects.all()
    categories = Category.objects.all()
    return render(
        request,
        "Normal/Guide.html",
        {
            "guides": guides,
            "faqs": faqs,
            "categories": categories,
        },
    )


def aayutreat(request):
    retreats = AyureTreat.objects.filter(is_deleted=False)
    categories = Category.objects.all()
    return render(request, "Normal/aayutreat.html", {"retreats": retreats, "categories": categories})


def ayuretreat_detail(request, pk):
    retreat = get_object_or_404(AyureTreat, pk=pk, is_deleted=False)
    highlights = RetreatHighlight.objects.filter(ayure_treat=retreat, is_deleted=False)
    program_days = ProgramDay.objects.filter(ayure_treat=retreat, is_deleted=False).order_by("day_number")
    who_is_it_for = Whoisitfor.objects.filter(ayure_treat=retreat, is_deleted=False)
    categories = Category.objects.all()
    context = {
        "retreat": retreat,
        "highlights": highlights,
        "program_days": program_days,
        "who_is_it_for": who_is_it_for,
        "categories": categories,
    }
    return render(request, "Normal/ayuretreat-detail.html", context)


def quiz(request):
    if request.method == "POST":
        # Save quiz data
        name = request.POST.get("name")
        age_ranges = request.POST.get("age_ranges")  # Comma-separated
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        body_type = request.POST.get("body_type")  # Determined body type
        body_type_ratios = request.POST.get("body_type_ratios")  # JSON string
        selected_choices_str = request.POST.get(
            "selected_choices"
        )  # Comma-separated string

        import json
        ratios_dict = json.loads(body_type_ratios) if body_type_ratios else None

        quiz_log = CustomerQuizLog.objects.create(
            name=name,
            age_ranges=age_ranges,
            email=email,
            phone_number=phone,
            body_type=body_type,
            body_type_ratios=ratios_dict,
        )
        if selected_choices_str:
            selected_choices_ids = selected_choices_str.split(",")
            choices = QuizChoice.objects.filter(id__in=selected_choices_ids, is_deleted=False)
            quiz_log.selected_choices.set(choices)
        quiz_log.save()

        # Prepare data for template
        quiz_data = {
            "name": name,
            "age_ranges": age_ranges,
            "email": email,
            "phone": phone,
            "body_type": body_type,
            "body_type_ratios": ratios_dict,
            "selections": selected_choices_ids if selected_choices_str else [],
        }

        categories = Category.objects.all()
        return render(
            request,
            "Normal/Quiz.html",
            {"quiz": None, "questions": [], "saved": True, "quiz_data": quiz_data, "categories": categories},
        )

    # Fetch the latest active quiz (not deleted)
    quiz = Quiz.objects.filter(is_active=True, is_deleted=False).order_by("-id").first()

    # Fetch active questions with their choices prefetched (not deleted)
    questions = (
        QuizQuestion.objects.filter(is_active=True, is_deleted=False)
        .prefetch_related("choices")
        .order_by("id")
    )
    categories = Category.objects.all()

    return render(
        request,
        "Normal/Quiz.html",
        {
            "quiz": quiz,
            "questions": questions,
            "categories": categories,
        },
    )


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
    categories = Category.objects.all()
    return render(
        request,
        "base/guides.html",
        {
            "guides": guides,
            "categories": categories,
        },
    )


def guide_detail(request, guide_id):
    guide = get_object_or_404(Guide, id=guide_id)
    modules = guide.modules.all()
    faqs = guide.faqs.all()
    customer_says = guide.customer_says.all()
    categories = Category.objects.all()
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
            "categories": categories,
        },
    )


# @csrf_exempt
# def quiz_create(request):
#     if request.method == "POST":
#         name = request.POST.get("name")
#         age_range = request.POST.get("age_range")
#         quiz_log = CustomerQuizLog.objects.create(name=name, age_range=age_range)
#         return JsonResponse({"quiz_id": quiz_log.id})
#     return JsonResponse({"error": "Invalid request"}, status=400)


# @csrf_exempt
# def quiz_update_skin_type(request):
#     if request.method == "POST":
#         quiz_id = request.POST.get("quiz_id")
#         skin_type_id = request.POST.get("skin_type_id")
#         quiz_log = CustomerQuizLog.objects.get(id=quiz_id)
#         quiz_log.skin_type_id = skin_type_id
#         quiz_log.save()
#         return JsonResponse({"success": True})
#     return JsonResponse({"error": "Invalid request"}, status=400)


# @csrf_exempt
# def quiz_update_skin_concern(request):
#     if request.method == "POST":
#         quiz_id = request.POST.get("quiz_id")
#         skin_concern_id = request.POST.get("skin_concern_id")
#         quiz_log = CustomerQuizLog.objects.get(id=quiz_id)
#         quiz_log.skin_concern_id = skin_concern_id
#         quiz_log.save()
#         return JsonResponse({"success": True})
#     return JsonResponse({"error": "Invalid request"}, status=400)


# @csrf_exempt
# def quiz_update_price_range(request):
#     if request.method == "POST":
#         quiz_id = request.POST.get("quiz_id")
#         price_range = request.POST.get("price_range")
#         quiz_log = CustomerQuizLog.objects.get(id=quiz_id)
#         quiz_log.price_range = price_range
#         quiz_log.save()
#         return JsonResponse({"success": True})
#     return JsonResponse({"error": "Invalid request"}, status=400)


# def get_skin_types(request):
#     skin_types = Skintype.objects.all()
#     data = [{"id": st.id, "name": st.name} for st in skin_types]
#     return JsonResponse({"skin_types": data})


# def get_skin_concerns(request):
#     concerns = ShopByConcern.objects.all()
#     data = [{"id": c.id, "name": c.title} for c in concerns]
#     return JsonResponse({"concerns": data})


# def get_price_choices(request):
#     choices = CustomerQuizLog.PriceRange.choices
#     data = [{"value": v, "label": l} for v, l in choices]
#     return JsonResponse({"price_choices": data})


# def get_age_ranges(request):
#     choices = CustomerQuizLog.AgeRange.choices
#     data = [{"value": v, "label": l} for v, l in choices]
#     return JsonResponse({"age_ranges": data})


# def quiz_recommendations(request):
#     quiz_id = request.GET.get("quiz_id") or request.POST.get("quiz_id")
#     if quiz_id:
#         quiz_log = CustomerQuizLog.objects.get(id=quiz_id)
#         products = Product.objects.all()
#         # Filter by skin type
#         if quiz_log.skin_type_id:
#             products = products.filter(skin_types__id=quiz_log.skin_type_id)
#         # Filter by price range
#         if quiz_log.price_range == "under_100":
#             products = products.filter(price__lt=100)
#         elif quiz_log.price_range == "100_300":
#             products = products.filter(price__gte=100, price__lte=300)
#         elif quiz_log.price_range == "over_300":
#             products = products.filter(price__gt=300)
#         # Return all filtered products
#         recommendations = [
#             {
#                 "name": p.name,
#                 "price": p.price,
#                 "id": p.id,
#                 "image": (
#                     p.primary_image.url
#                     if hasattr(p, "primary_image") and p.primary_image
#                     else ""
#                 ),
#                 "step": i + 1,
#             }
#             for i, p in enumerate(products)
#         ]
#         return JsonResponse({"recommendations": recommendations})
#     return JsonResponse({"error": "Invalid request"}, status=400)


def submit_booking_inquiry(request, retreat_id):
    from ayuretreat.models import BookingInquiry, AyureTreat

    if request.method == "POST":
        try:
            retreat = get_object_or_404(AyureTreat, id=retreat_id)
            name = request.POST.get("name")
            email = request.POST.get("email")
            phone_number = request.POST.get("phone_number")
            reason_for_retreat = request.POST.get("reason_for_retreat")
            inquiry = BookingInquiry(
                ayure_treat=retreat,
                name=name,
                email=email,
                reason_for_retreat=reason_for_retreat,
            )
            inquiry.save()
            messages.success(request, "Your inquiry has been submitted!")
        except Exception as e:
            messages.error(request, f"Error submitting inquiry: {str(e)}")
    return redirect("ayuretreat_detail", pk=retreat_id)
