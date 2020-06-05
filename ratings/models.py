from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Ratings(models.Model):
    rating = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='ratings_given',
        on_delete=models.CASCADE)

    rated = models.ForeignKey(
        'jwt_auth.User',
        related_name='rating',
        on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f'{self.owner} Rated {self.rated} {self.rating}'