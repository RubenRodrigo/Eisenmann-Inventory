# Generated by Django 3.2.5 on 2022-02-02 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20220201_1218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productstock',
            name='created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='productstock',
            name='updated_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]