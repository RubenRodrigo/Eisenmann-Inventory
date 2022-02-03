# Generated by Django 3.2.5 on 2022-02-02 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
        ('client', '0001_initial'),
        ('product', '0003_auto_20220202_1529'),
        ('service', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, null=True)),
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('total_cost', models.FloatField(blank=True, default=0.0, null=True)),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='service_product', to='employee.employee')),
                ('product_stock', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='service_product', to='product.productstock')),
            ],
        ),
        migrations.AlterField(
            model_name='service',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='service', to='client.client'),
        ),
        migrations.DeleteModel(
            name='ServiceProductDetail',
        ),
        migrations.AddField(
            model_name='serviceproduct',
            name='service',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='service_product', to='service.service'),
        ),
    ]
