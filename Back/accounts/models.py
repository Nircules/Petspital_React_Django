from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator, ValidationError
from phonenumber_field.modelfields import PhoneNumberField


def is_number(number):
    if not number.isdigit():
        raise ValidationError('ID can contain only numbers.')


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user_profile')
    first_name = models.CharField(
        max_length=50, validators=[MinLengthValidator(2)])
    last_name = models.CharField(max_length=50, validators=[
                                 MinLengthValidator(2)])
    email = models.EmailField(unique=True, null=True)
    phone_number = PhoneNumberField(region='IL', unique=True, null=True)
    id_number = models.CharField(unique=True, max_length=9, null=True,
                                 validators=[MinLengthValidator(9), MaxLengthValidator(9), is_number])
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
