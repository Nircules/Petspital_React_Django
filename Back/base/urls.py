from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('users/', views.my_users),
    path('users/<int:user_id>', views.my_users),
    path('products/', views.my_products),  # All Products
    path('products/<int:product_id>', views.my_products),  # All Products
    path('species', views.species),  # All Species
    path('sub_categories', views.sub_categories),  # All Sub Categories
    path('categories', views.categories),  # All Categories
    path('sub_category_products/<int:sub_category_id>',
         views.products_by_sub_category),
    path('category_products/<int:category_id>', views.products_by_category),
    path('categories_by_specie/<int:specie_id>', views.categories_by_specie_id),
    path('specific_sub_cat/<int:sub_category_id>', views.sub_category),
    path('sub_categories_by_category/<int:category_id>',
         views.sub_categories_by_category_id),
    path('products/search', views.search),
    path('products/search_suggestions', views.suggest),
]
