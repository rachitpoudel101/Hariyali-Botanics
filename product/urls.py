from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  
    path('shop/', views.shop, name='shop'),
    path('product-details/<int:id>/', views.prodec, name='product-details'),
    path('about-us/', views.aboutus, name='about-us'),
    path('club/', views.club, name='club'),
    path('guide/', views.guide, name='guide'),
    path('aayutreat/', views.aayutreat, name='aayutreat'),
    path('quiz/', views.quiz, name='quiz'),
]
