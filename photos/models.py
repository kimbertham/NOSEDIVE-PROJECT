
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Photos(models.Model):
    image = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='photos', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'comment - {self.owner}'
