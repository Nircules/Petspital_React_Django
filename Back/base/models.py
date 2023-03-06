from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


# This class holds the information of all the users in the App, wether staff or not.
class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user_profile')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, null=True)
    phone_number = PhoneNumberField(region='IL', unique=True, null=True)
    id_number = models.CharField(unique=True, max_length=9, null=True)
    address = models.CharField(max_length=100)
    join_date = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        for field in ['first_name', 'last_name', 'address']:
            value = getattr(self, field)
            if value:
                setattr(self, field, value.title())
        for field in ['email', 'phone_number', 'id_number']:
            value = getattr(self, field)
            if not value:
                setattr(self, field, None)
        super(UserProfile, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Specie(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    specie = models.ForeignKey(Specie, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


class Sub_Category(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.category}, {self.name}"

    class Meta:
        verbose_name_plural = 'Sub_Categories'


def upload_path(instance, filename):
    category = instance.sub_category.category.name
    sub_cat = instance.sub_category.name
    return '/'.join(['products/images', category, sub_cat, filename])


class Product(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to=upload_path,
                              height_field=None, width_field=None, max_length=None, null=True)
    createdTime = models.DateTimeField(auto_now_add=True)
    sub_category = models.ForeignKey(
        Sub_Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
