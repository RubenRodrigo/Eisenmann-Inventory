# Generated by Django 3.2.5 on 2022-02-01 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productentry',
            old_name='product',
            new_name='product_stock',
        ),
        migrations.AlterField(
            model_name='productstock',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]