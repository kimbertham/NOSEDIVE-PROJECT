from django.db import models
from django.contrib.auth.models import AbstractUser
from follow.models import Contact

class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True, blank=True)
    description = models.CharField(max_length=500, blank=True)
    tagline = models.CharField(max_length=500, blank=True)
    profile_image = models.CharField(max_length=500, default='https://bit.ly/30vhZFs', blank=True)
    career = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=50, blank=True)
    age = models.IntegerField(blank=True, null=True)

    following = models.ManyToManyField('self', through=Contact, related_name='followers',symmetrical=False)


    RELATIONSHIP_CHOICES = (
        ('Single', 'Single'),
        ('Relationship', 'In a Realtionship'),
        ('Complicated', 'Complicated'),
        ('Widowed', 'Widowed'),
        ('Engaged', 'Engaged'),
    )
    relationship = models.CharField(max_length=100, blank=True, choices=RELATIONSHIP_CHOICES)
    
