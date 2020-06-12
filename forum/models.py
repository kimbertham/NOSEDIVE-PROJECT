
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Forum(models.Model):
    content = models.CharField(max_length=500)
    title=models.CharField(max_length=500)
    description= models.CharField(max_length=500, blank=True)
    created_at = models.DateField(auto_now_add=True)
    limitations= models.CharField(max_length=500, blank=True)
    image = models.CharField(max_length=500, default='https://i.imgur.com/ZNxb6AE.jpg', blank=True)
    forum_owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='forums', 
    on_delete=models.CASCADE)
    

    def __str__(self):
        return f'comment - {self.forum_owner} {self.content}'

