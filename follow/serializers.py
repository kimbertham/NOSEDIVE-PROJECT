from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Contact
from comments.serializers import PopulatedCommentSerializer
User = get_user_model()

class FollowSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Contact
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

class PopulatedFollowingSerializer(FollowSerializer):
    user_to = UserSerializer()

class PopulatedFollowerSerializer(FollowSerializer):
    user_from = UserSerializer()

