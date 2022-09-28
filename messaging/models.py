
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

    conversation = models.ForeignKey(
        'conversations.Conversations',
        related_name='messages',
        on_delete=models.CASCADE)

    read = models.BooleanField(default=False)
    content = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f' {self.sender} to {self.reciever}'

    class Meta:
        ordering = ('-created_at',)