"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Django
from django.contrib import admin
from django.urls import path, include, re_path

# DRF_YASG - Swagger
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# DRFJWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Eisenmann API documentation",
        default_version='v1',
        description="API for Eisenmann backend",
    ),
    public=True,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/service/', include('service.urls')),
    path('api/product/', include('product.urls')),
    path('api/client/', include('client.urls')),
    path('api/employee/', include('employee.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'
    ),
    path('swagger/',
         schema_view.with_ui(
             'swagger',
             cache_timeout=0
         ),
         name='schema-swagger-ui'),
    path('redoc/',
         schema_view.with_ui(
             'redoc',
             cache_timeout=0
         ),
         name='schema-redoc'),
]