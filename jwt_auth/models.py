from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True, blank=True)
    description = models.CharField(max_length=500, blank=True)
    profile_image = models.CharField(max_length=500, blank=True)
    career = models.CharField(max_length=50, blank=True)
    Location = models.CharField(max_length=50, blank=True)
    Birthday = models.IntegerField(blank=True, null=True)
    RELATIONSHIP_CHOICES = (
        ('Single', 'Single'),
        ('Relationship', 'In a Realtionship'),
        ('Complicated', 'Complicated'),
        ('Widowed', 'Widowed'),
        ('Engaged', 'Engaged'),
        
    )
    Relationship = models.CharField(max_length=100, blank=True, choices=RELATIONSHIP_CHOICES)
    
