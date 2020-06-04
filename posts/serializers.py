from django.shortcuts import render
from .models import Post
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class PopulatedCommentSerializer(PostSerializer):
    owner = UserSerializer()

