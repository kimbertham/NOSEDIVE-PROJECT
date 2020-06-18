from django.db import models


class PostRatings(models.Model):
    rating = models.FloatField()

    rating_owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='postsrated',
        on_delete=models.CASCADE)

    post_owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='postsratings',
    on_delete=models.CASCADE)

    post = models.ForeignKey(
        'posts.Post',
        related_name='ratings', 
        on_delete=models.CASCADE)

    updated_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return f'{self.post_owner} {self.rating}'