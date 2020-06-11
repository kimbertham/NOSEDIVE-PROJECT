from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Ratings(models.Model):
    rating = models.FloatField()
    # avg_rating = models.FloatField(blank=True)

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='ratings_given',
        on_delete=models.CASCADE)

    rated = models.ForeignKey(
        'jwt_auth.User',
        related_name='rating',
        on_delete=models.CASCADE)

    FEEDBACK_CHOICES = (
        ('Unattractive', 'Unattractive'),
        ('Rude Interaction', 'Rude Interaction'),
        ('Unpleasant Smell', 'Unpleasant Smell'),
        ('Impoverished Vibes', 'Impoverished Vibes'),
        ('Disciminatory', 'Disciminatory'),
    )
    feedback = models.CharField(max_length=100, blank=True, choices=FEEDBACK_CHOICES)
    

    created_at = models.DateField(auto_now_add=True)


    def __str__(self):
        return f'{self.owner} Rated {self.rated} {self.rating}'