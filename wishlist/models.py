from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Wishlist(models.Model):
    # content = models.CharField(max_length=500)
    url =models.CharField(max_length=500)
    thumbnail = models.CharField(max_length=500)
    title =models.CharField(max_length=500)
    price = models.CharField(max_length=500)

    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='wishlist', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.owner} wishlist'

