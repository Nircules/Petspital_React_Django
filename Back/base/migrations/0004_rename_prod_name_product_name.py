# Generated by Django 4.1.5 on 2023-01-09 23:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_product_sub_category"),
    ]

    operations = [
        migrations.RenameField(
            model_name="product",
            old_name="prod_name",
            new_name="name",
        ),
    ]
