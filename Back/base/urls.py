from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products', views.myProducts),
    path('sub_category/<int:sub_category_id>', views.productsByCategory)
]
