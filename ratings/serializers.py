from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Ratings

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username','profile_image',)

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ratings
        fields = '__all__'

class PopulatedRatingSerializer(RatingSerializer):
    owner = UserSerializer()
