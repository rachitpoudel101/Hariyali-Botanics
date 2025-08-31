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
    path("quiz-recommendations/", views.quiz_recommendations, name="quiz_recommendations"),
    path('quiz-create/', views.quiz_create, name='quiz_create'),
    path('quiz-update-skin-type/', views.quiz_update_skin_type, name='quiz_update_skin_type'),
    path('quiz-update-skin-concern/', views.quiz_update_skin_concern, name='quiz_update_skin_concern'),
    path('quiz-update-price-range/', views.quiz_update_price_range, name='quiz_update_price_range'),
    path('get-skin-types/', views.get_skin_types, name='get_skin_types'),
    path('get-skin-concerns/', views.get_skin_concerns, name='get_skin_concerns'),
    path('get-price-choices/', views.get_price_choices, name='get_price_choices'),
    path('get-age-ranges/', views.get_age_ranges, name='get_age_ranges'),
]
