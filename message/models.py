from django.db import models

class Message(models.Model):
    sender = models.ForeignKey('jwt_auth.User', related_name="sender", on_delete=models.CASCADE)
    reciever = models.ForeignKey('jwt_auth.User', related_name="reciever", on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'message - from {self.sender} to {self.reciever}'

