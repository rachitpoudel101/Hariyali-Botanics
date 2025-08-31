from django.http import JsonResponse
from product.models import Product, Skintype
from ShopByConcern.models import ShopByConcern

def quiz_recommendations(request):
    if request.method == "POST":
        data = request.POST
        skin_type_id = data.get("skin_type")
        concern_id = data.get("skin_concern")
        price_range = data.get("price_range")

        products = Product.objects.all()
        if skin_type_id:
            products = products.filter(skin_type_id=skin_type_id)
        if concern_id:
            products = products.filter(concern_id=concern_id)
        if price_range == "under_100":
            products = products.filter(price__lt=100)
        elif price_range == "100_300":
            products = products.filter(price__gte=100, price__lte=300)
        elif price_range == "over_300":
            products = products.filter(price__gt=300)

        recommendations = [
            {
                "name": p.name,
                "price": p.price,
                "step": i + 1
            }
            for i, p in enumerate(products[:3])
        ]
        return JsonResponse({"recommendations": recommendations})
    return JsonResponse({"error": "Invalid request"}, status=400)