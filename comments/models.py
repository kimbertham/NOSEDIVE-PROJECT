from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Comments(models.Model):
    content = models.CharField(max_length=500)
    updated_at = models.DateField(auto_now_add=True)
    created_at = models.DateField(auto_now_add=True)

    comment_owner = models.ForeignKey( #the person commenting 
    'jwt_auth.User',
    related_name='comment', 
    on_delete=models.CASCADE)

    post_owner = models.ForeignKey( #the person commenting 
    'jwt_auth.User',
    related_name='comments', 
    on_delete=models.CASCADE)

    post = models.ForeignKey(
    'posts.Post',
    related_name='comments', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'comment - {self.comment_owner}'