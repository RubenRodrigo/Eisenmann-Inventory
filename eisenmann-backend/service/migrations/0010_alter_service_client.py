# Generated by Django 3.2.5 on 2021-08-19 20:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0002_auto_20210819_2024'),
        ('service', '0009_alter_serviceproductdetail_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='client_services', to='client.client'),
        ),
    ]
