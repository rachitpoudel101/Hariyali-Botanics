from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("shop/", views.shop, name="shop"),
    path("product-details/<int:id>/", views.prodec, name="product-details"),
    path("about-us/", views.aboutus, name="about-us"),
    path("club/", views.club, name="club"),
    path("guide/", views.guide, name="guide"),
    path("aayutreat/", views.aayutreat, name="aayutreat"),
    path("quiz/", views.quiz, name="quiz"),
    path("product/<int:id>/", views.prodec, name="prodec"),
    path("product/<int:product_id>/review/", views.submit_review, name="submit_review"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
