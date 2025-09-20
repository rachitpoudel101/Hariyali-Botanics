from django.urls import path
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
    path("guides/", views.guides_list, name="guides-list"),
    path("guides/<int:guide_id>/", views.guide_detail, name="guide-detail"),
    path("ayuretreat/<int:pk>/", views.ayuretreat_detail, name="ayuretreat_detail"),
    path(
        "ayuretreat/<int:retreat_id>/booking-inquiry/",
        views.submit_booking_inquiry,
        name="submit_booking_inquiry",
    ),
]
