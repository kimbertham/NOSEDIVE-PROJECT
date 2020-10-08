from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Conversations(models.Model):
    participants = models.ManyToManyField(User)

    def __str__(self):
        return f' {self.participants}'