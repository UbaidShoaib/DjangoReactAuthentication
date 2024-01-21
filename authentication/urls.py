from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .views import CustomUserViewSet, AddressViewSet, LogoutView, register

router = DefaultRouter()
router.register("users", CustomUserViewSet)
router.register("addresses", AddressViewSet)

urlpatterns = [
    path("logout/", LogoutView.as_view(), name="logout"),
    path("register/", register, name="register"),
    # path('users-with-addresses/<int:pk>/', user_with_addresses, name='user-with-addresses'),
    path("", include(router.urls)),
]
