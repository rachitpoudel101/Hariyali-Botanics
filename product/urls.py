from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  
    path('shop/',views.shop, name='shop'),
    path('product-details/',views.prodec,name='product-details'),
    path('about-us/',views.aboutus, name='about-us'),
]
