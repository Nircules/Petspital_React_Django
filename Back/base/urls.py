from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products', views.my_products),
    path('sub_category/<int:sub_category_id>', views.products_by_sub_category),
    path('species', views.species),
    path('categories/<int:specie_id>', views.categories_by_specie_id),
]
