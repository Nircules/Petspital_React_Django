from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products', views.my_products),
    path('sub_category_products/<int:sub_category_id>',
         views.products_by_sub_category),
    path('category_products/<int:category_id>', views.products_by_category),
    path('species', views.species),
    path('categories_by_specie/<int:specie_id>', views.categories_by_specie_id),
    path('specific_sub_cat/<int:sub_category_id>', views.sub_category),
    path('sub_categories_by_category/<int:category_id>',
         views.sub_categories_by_category_id),
]
