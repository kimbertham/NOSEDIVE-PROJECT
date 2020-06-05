from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Comments(models.Model):
    content = models.CharField(max_length=500)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='comments', 
    on_delete=models.CASCADE)

    post = models.ForeignKey(
    'posts.Post',
    related_name='comments', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'comment - {self.owner}'