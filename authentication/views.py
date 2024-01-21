import logging
from django.contrib.auth.hashers import make_password
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Address
from .serializers import (
    CustomUserSerializer,
    AddressSerializer,
    UserWithAddressesSerializer,
    CustomUserRegisterSerializer,
)

# Set up logging
logger = logging.getLogger(__name__)


@api_view(["POST"])
def register(request):
    address_data = request.data.get("addresses", [])
    user_data = request.data.get("user", {})
    logger.debug(
        "Received registration request with user data: %s and address data: %s",
        user_data,
        address_data,
    )

    if "password" in user_data:
        user_data["password"] = make_password(user_data["password"])

    user_serializer = CustomUserRegisterSerializer(data=user_data)

    if user_serializer.is_valid():
        user = user_serializer.save()
        logger.info("New user created: %s", user.username)

        for address in address_data:
            address["user"] = user.id
            address_serializer = AddressSerializer(data=address)

            if address_serializer.is_valid():
                address_serializer.save()
                logger.debug("Address created for user %s: %s", user.username, address)
            else:
                logger.error("Address validation failed: %s", address_serializer.errors)
                user.delete()
                return Response(
                    address_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        user.is_active = True
        user.save()

        return Response(status=status.HTTP_201_CREATED)
    else:
        logger.warning("User registration failed: %s", user_serializer.errors)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info("User logged out")
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            logger.error("Logout failed: %s", str(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=["get"])
    def with_addresses(self, request, pk=None):
        user = self.get_object()
        serializer = UserWithAddressesSerializer(user)
        return Response(serializer.data)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
