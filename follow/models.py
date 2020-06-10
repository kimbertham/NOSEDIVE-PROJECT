
from django.db import models



class Contact(models.Model):

    user_from = models.ForeignKey( 'jwt_auth.User', related_name="rel_from_set", on_delete= models.CASCADE)
    user_to = models.ForeignKey( 'jwt_auth.User', related_name="rel_to_set",on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f' {self.user_from} followed {self.user_to}'



