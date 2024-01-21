from rest_framework import serializers
from .models import CustomUser, Address


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "gender",
            "date_of_birth",
            "phone_number",
        ]


class CustomUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "password",
            "username",
            "first_name",
            "last_name",
            "email",
            "gender",
            "date_of_birth",
            "phone_number",
        ]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "user", "address_type", "street", "city", "province"]


class UserWithAddressesSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "gender",
            "date_of_birth",
            "phone_number",
            "addresses",
        ]
