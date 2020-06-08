from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Post
from comments.serializers import PopulatedCommentSerializer
User = get_user_model()

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

class PopulatedPostSerializer(PostSerializer):
    owner = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)

