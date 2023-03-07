from django.http import JsonResponse
from .models import Product, Category, Sub_Category, Specie, UserProfile
from .serializer import ProductSerializer, SpecieSerializer, CategorySerializer, SubCategorySerializer, UsersSerializer, UsersProfilesSerializer
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from django.contrib.auth.hashers import make_password


def index(req):
    return JsonResponse('hello', safe=False)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def my_products(request, product_id=-1):
    all_products = ProductSerializer(Product.objects.all(), many=True).data
    if request.method == "GET":
        if product_id > -1:
            single_product = ProductSerializer(
                Product.objects.get(id=product_id)).data
            return JsonResponse(single_product, safe=False)
        else:
            return JsonResponse(all_products, safe=False)
    elif request.method == "POST":
        product_name = request.data['name']
        description = request.data['description']
        price = request.data['price']
        stock = request.data['stock']
        image = request.data['image']
        created_time = datetime.now()
        sub_category = Sub_Category.objects.get(
            id=request.data['sub_category'])
        Product.objects.create(name=product_name, description=description,
                               price=price, stock=stock, image=image, createdTime=created_time, sub_category=sub_category)
        return JsonResponse(all_products, safe=False)
    elif request.method == "DELETE":
        product = Product.objects.get(id=product_id)
        product.delete()
        return JsonResponse(all_products, safe=False)
    elif request.method == "PUT":
        product = Product.objects.get(id=product_id)
        product.name = request.data['name']
        product.description = request.data['description']
        product.price = request.data['price']
        product.stock = request.data['stock']
        if (request.data['image'] != 'null'):
            print(request.data['image'])
            product.image = request.data['image']
        product.sub_category = Sub_Category.objects.get(
            id=request.data['sub_category'])
        product.save()
        return JsonResponse(all_products, safe=False)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def my_users(request, user_id=-1):
    all_users = UsersSerializer(User.objects.all(), many=True).data
    if request.method == "GET":
        if user_id > -1:
            single_user = UsersSerializer(User.objects.get(id=user_id)).data
            return JsonResponse(single_user, safe=False)
        else:
            return JsonResponse(all_users, safe=False)
    if request.method == "POST":
        u_username = request.data['username']
        u_password = request.data['password']
        hashed_password = make_password(u_password)
        new_user = User.objects.create(
            username=u_username, password=hashed_password)
        response = UsersSerializer(User.objects.get(id=new_user.id)).data
        if new_user:
            UserProfile.objects.create(user_id=new_user.id)
        return JsonResponse(response, safe=False)


@api_view(['GET', 'PUT'])
def user_profile(request, user_id=-1):
    all_users = UsersProfilesSerializer(
        UserProfile.objects.all(), many=True).data
    if request.method == "GET":
        if user_id > -1:
            single_user = UsersProfilesSerializer(
                UserProfile.objects.get(user=user_id)).data
            return JsonResponse(single_user, safe=False)
        else:
            return JsonResponse(all_users, safe=False)
    elif request.method == "PUT":
        single_user = UserProfile.objects.get(user=user_id)
        print('*'*500)
        print(request.data['first_name'])
        single_user.first_name = request.data['first_name']
        single_user.last_name = request.data['last_name']
        single_user.email = request.data['email']
        single_user.phone_number = request.data['phone_number']
        single_user.id_number = request.data['id_number']
        single_user.address = request.data['address']
        single_user.save()
        result = UsersProfilesSerializer(single_user).data
        return JsonResponse(result, safe=False)


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
