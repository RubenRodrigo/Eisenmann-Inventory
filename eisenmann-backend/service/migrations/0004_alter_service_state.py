# Generated by Django 3.2.5 on 2021-07-17 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_alter_service_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='state',
            field=models.BooleanField(default=False),
        ),
    ]
