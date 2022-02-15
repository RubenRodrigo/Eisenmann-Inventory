# Generated by Django 3.2.5 on 2022-02-15 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='name',
        ),
        migrations.AddField(
            model_name='employee',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='firts_name',
            field=models.CharField(blank=True, max_length=110, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='last_name',
            field=models.CharField(blank=True, max_length=110, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]