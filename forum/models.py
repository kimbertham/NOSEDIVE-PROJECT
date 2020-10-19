
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()



class Forum(models.Model):
    content = models.CharField(max_length=5000)
    title=models.CharField(max_length=500)
    description= models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    limitations= models.CharField(max_length=500, blank=True)
    image = models.CharField(max_length=500, default='https://i.imgur.com/ZNxb6AE.jpg', blank=True)
    post_image= models.CharField(max_length=10000, blank=True)
    forum_owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='forums', 
    on_delete=models.CASCADE)

    followers = models.ManyToManyField(User, through='forum.ForumFollow')

    def __str__(self):
        return f'comment - {self.forum_owner} {self.content}'

class ForumFollow(models.Model):

    follower = models.ForeignKey( 
    'jwt_auth.User',
    related_name='forums_followed', 
    on_delete=models.CASCADE)

    forum = models.ForeignKey(   
    'forum.Forum',
    related_name='forums_followers', 
    on_delete=models.CASCADE)




#Forum_Comments 
class ForumComments(models.Model):
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    image= models.CharField(max_length=10000, blank=True)

    forum = models.ForeignKey(
    'forum.Forum',
    related_name='forums_comments', 
    on_delete=models.CASCADE)

    comment_owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='forums_comments', 
    on_delete=models.CASCADE)

    parent=models.ForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='children',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'comment - {self.comment_owner},{self.content}'
