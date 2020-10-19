from django.db import models
from django.contrib.auth import get_user_model
import datetime

User = get_user_model()

# Create your models here.
class Post(models.Model):
    content = models.CharField(max_length=500, blank=True)
    updated_at =  models.DateField(default=datetime.date.today)
    created_at =  models.DateField(default=datetime.date.today)
    image= models.CharField(max_length=10000, blank=True)
    profile_owner = models.ForeignKey('jwt_auth.User',
    related_name='page_posts', 
    on_delete=models.CASCADE)

    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='posts', 
    on_delete=models.CASCADE)

    def __str__(self):
        return f'comment - {self.owner}'



