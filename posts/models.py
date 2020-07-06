from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Post(models.Model):
    content = models.CharField(max_length=500)
    updated_at = models.DateField(auto_now_add=True)
    created_at = models.DateField(auto_now_add=True)

    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='posts', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'comment - {self.owner}'



