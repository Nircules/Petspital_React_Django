from django.http import JsonResponse
from .models import Product, Category, Sub_Category, Specie
from .serializer import ProductSerializer, SpecieSerializer, CategorySerializer, SubCategorySerializer
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response


def index(req):
    return JsonResponse('hello', safe=False)


@api_view(['GET', 'POST'])
def my_products(request):
    if request.method == "GET":
        all_products = ProductSerializer(Product.objects.all(), many=True).data
        return JsonResponse(all_products, safe=False)
    elif request.method == "POST":
        request_data = request.get_json()


def species(req):
    all_species = SpecieSerializer(Specie.objects.all(), many=True).data
    return JsonResponse(all_species, safe=False)


def sub_categories(req):
    all_sub_cats = SubCategorySerializer(
        Sub_Category.objects.all(), many=True).data
    return JsonResponse(all_sub_cats, safe=False)


def categories(req):
    all_categoriess = CategorySerializer(
        Category.objects.all(), many=True).data
    return JsonResponse(all_categoriess, safe=False)


def products_by_sub_category(req, sub_category_id):
    filtered_products = ProductSerializer(
        Product.objects.filter(sub_category=sub_category_id), many=True).data
    return JsonResponse(filtered_products, safe=False)


def products_by_category(req, category_id):
    filtered_products = ProductSerializer(
        Product.objects.filter(sub_category__category=category_id), many=True).data
    return JsonResponse(filtered_products, safe=False)


def sub_category(req, sub_category_id):
    json_sub_cat = SubCategorySerializer(
        Sub_Category.objects.get(id=sub_category_id)).data
    return JsonResponse(json_sub_cat, safe=False)


def categories_by_specie_id(req, specie_id):
    filtered_categories = CategorySerializer(
        Category.objects.filter(specie=specie_id), many=True).data
    return JsonResponse(filtered_categories, safe=False)


def sub_categories_by_category_id(req, category_id):
    filtered_sub_categories = SubCategorySerializer(
        Sub_Category.objects.filter(category_id=category_id), many=True).data
    return JsonResponse(filtered_sub_categories, safe=False)


def search(request):
    search_term = request.GET.get('search_value', '')
    products = ProductSerializer(Product.objects.filter(
        name__icontains=search_term), many=True).data
    return JsonResponse(products, safe=False)


def suggest(request):
    query = request.GET.get('query', '')
    suggestions = ProductSerializer(Product.objects.filter(
        Q(name__icontains=query) | Q(description__icontains=query))[:10], many=True).data
    return JsonResponse(suggestions, safe=False)
