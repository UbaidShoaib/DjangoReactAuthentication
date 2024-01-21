from django.contrib.auth.models import AbstractUser
from django.db import models


class Address(models.Model):
    user = models.ForeignKey(
        "CustomUser", on_delete=models.CASCADE, related_name="addresses"
    )
    address_type = models.CharField(
        max_length=10, choices=[("permanent", "Permanent"), ("current", "Current")]
    )
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    province = models.CharField(max_length=50)

    class Meta:
        unique_together = (
            "user",
            "address_type",
        )  # Ensures a user doesn't have multiple 'permanent' or 'current' addresses

    def __str__(self):
        return f"{self.get_address_type_display()} Address: {self.street}, {self.city}, {self.province}"


class CustomUser(AbstractUser):
    gender_choices = [("M", "Male"), ("F", "Female"), ("O", "Other")]
    gender = models.CharField(
        max_length=1, choices=gender_choices, null=True, blank=True
    )
    date_of_birth = models.DateField(null=True)
    phone_number = models.CharField(max_length=15, null=True)
