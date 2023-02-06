from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Product, Category, Sub_Category
from .serializer import ProductSerializer


def index(req):
    return JsonResponse('hello', safe=False)


def myProducts(req):
    all_products = ProductSerializer(Product.objects.all(), many=True).data
    return JsonResponse(all_products, safe=False)


def productsByCategory(req, category_id):
    filtered_products = ProductSerializer(
        Product.objects.filter(sub_category=category_id), many=True).data
    sub_cat = Sub_Category.objects.get(id=filtered_products[0]['sub_category'])
    print(sub_cat)
    return JsonResponse(filtered_products, safe=False)
