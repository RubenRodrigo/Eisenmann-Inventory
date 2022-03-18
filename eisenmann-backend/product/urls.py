# Django
from django.urls import path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views

router = DefaultRouter()

router.register(
    r'product',
    views.ProductViewSet,
    basename='product'
)
router.register(
    r'product_list',
    views.ProductAllListView,
    basename='product_list'
)
router.register(
    r'product_stock',
    views.ProductStockViewSet,
    basename='product_stock'
)
router.register(
    r'product_stock_list',
    views.ProductStockAllListView,
    basename='product_stock_list'
)
router.register(
    r'product_entry',
    views.ProductEntryViewSet,
    basename='product_entry')

router.register(r'type', views.TypeViewSet, basename='type')
router.register(r'unit', views.UnitViewSet, basename='unit')

urlpatterns = [
    # Real stock of the product
    path('', include(router.urls))
]
