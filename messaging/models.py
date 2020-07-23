
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

# Create your models here.
class Messaging(models.Model):
    reciever = models.ForeignKey(
    'jwt_auth.User',
    related_name='sender', 
    on_delete=models.CASCADE)
    sender= models.ForeignKey(
    'jwt_auth.User',
    related_name='reciever', 
    on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=5000)
    conversation = models.ForeignKey(
        'conversations.Conversations',
        related_name='messages',
        on_delete=models.CASCADE)

    def __str__(self):
        return f' {self.sender} to {self.reciever}'