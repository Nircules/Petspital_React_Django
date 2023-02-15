from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Product, Category, Sub_Category, Specie
from .serializer import ProductSerializer, SpecieSerializer, CategorySerializer, SubCategorySerializer


def index(req):
    return JsonResponse('hello', safe=False)


def my_products(req):
    all_products = ProductSerializer(Product.objects.all(), many=True).data
    return JsonResponse(all_products, safe=False)


def species(req):
    all_species = SpecieSerializer(Specie.objects.all(), many=True).data
    return JsonResponse(all_species, safe=False)


def products_by_sub_category(req, sub_category_id):
    filtered_products = ProductSerializer(
        Product.objects.filter(sub_category=sub_category_id), many=True).data
    return JsonResponse(filtered_products, safe=False)


def categories_by_specie_id(req, specie_id):
    filtered_categories = CategorySerializer(
        Category.objects.filter(specie=specie_id), many=True).data
    return JsonResponse(filtered_categories, safe=False)


def sub_categories_by_category_id(req, category_id):
    filtered_sub_categories = SubCategorySerializer(
        Sub_Category.objects.filter(category_id=category_id), many=True).data
    return JsonResponse(filtered_sub_categories, safe=False)
