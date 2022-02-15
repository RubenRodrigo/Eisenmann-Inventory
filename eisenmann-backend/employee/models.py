from django.db import models

from core.models.BaseModel import BaseModel

# Create your models here.

# Este modelo es el empleado.


class Employee(BaseModel):
    firts_name = models.CharField(max_length=110, null=True, blank=True)
    last_name = models.CharField(max_length=110, null=True, blank=True)

    def __str__(self):
        return self.firts_name
