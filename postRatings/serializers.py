from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import PostRatings
from posts.serializers import PostSerializer
from ratings.serializers import PopulatedRatingSerializer



User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'profile_image')

class PostRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRatings
        fields = '__all__'



class PopulatedPostRatingSerializer(PostRatingSerializer):
    post_owner = UserSerializer()
    rating_owner = UserSerializer()
    post = PostSerializer()
    

    
    

