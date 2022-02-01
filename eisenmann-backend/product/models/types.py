# Django
from django.db import models

# Create your models here.


# Este modelo es el tipo de producto: Soldadura, Pintura, etc
class Type(models.Model):
    name = models.CharField(max_length=128, null=True, blank=True)
    description = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.name


# Este modelo es la unidad del product: kg, lt, cm
class Unit(models.Model):
    name = models.CharField(max_length=128, null=True, blank=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    abr = models.CharField(max_length=3, null=True, blank=True)

    def __str__(self):
        return self.name
