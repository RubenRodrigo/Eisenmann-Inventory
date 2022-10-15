# Django
from django.urls import path, include

# DRF
from rest_framework.routers import DefaultRouter

# Views
from . import views

router = DefaultRouter()
router.register(r'user', views.UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # Get Token - SignIn
    path('signout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]
