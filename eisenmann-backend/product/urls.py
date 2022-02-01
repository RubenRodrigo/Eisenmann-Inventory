# Django
from django.urls import url, path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views

router = DefaultRouter()
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'type', views.TypeViewSet, basename='type')
router.register(r'unit', views.UnitViewSet, basename='unit')

urlpatterns = [
    # List or Detail of the product stock
    url(r'^product_stock/$', views.ListProductStock.as_view(),
        name='list_product_stock'),
    url(r'^product_stock/(?P<pk>[0-9]+)/$',
        views.DetailProductStock.as_view(), name='detail_product_stock'),

    # Real stock of the product
    url(r'^product_stock_real/$', views.ListProductStockReal.as_view()),
    url(r'^product_stock_real/(?P<pk>[0-9]+)/$',
        views.ProductStockReal.as_view()),

    url(r'^product_entry/$', views.ListProductEntries.as_view(),
        name='list_product_entries'),
    url(r'^product_entry/(?P<pk>[0-9]+)/$',
        views.DetailProductEntry.as_view(), name='detail_product_entry'),
    path('', include(router.urls))
]
