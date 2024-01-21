SECRET_KEY = "django-insecure-hdu(-btrjx*hp5!u1q@f^@=d6agpxs%%++eht1a(u#%r27uxvr"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "*",
]

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "auth_database",  # Your database name
        "USER": "doadmin",  # Your database username
        "PASSWORD": "12345",  # Your database password
        "HOST": "localhost",  # Your database host
        "PORT": "5432",  # Your database port
    }
}


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add the URL of your React app here
]
