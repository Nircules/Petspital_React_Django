from django.db import models

# Create your models here.


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


class Product(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    createdTime = models.DateTimeField(auto_now_add=True)
    sub_category = models.ForeignKey(
        Sub_Category, on_delete=models.CASCADE, null=True)
    fields = ['prod_name', 'description', 'price']

    def __str__(self):
        return self.name
