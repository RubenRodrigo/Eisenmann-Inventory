import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

# Create your tests here.


def test_view_user_create():
    data = {
        'email': 'test@gmail.com',
        'password': 'test',
        'username': 'test_superuser',
    }

    url = reverse('user-list')
    user = APIClient()
    request = user.post(url, data, format='json')

    assert request.status_code == status.HTTP_201_CREATED
