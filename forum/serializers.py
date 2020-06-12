from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Forum
from comments.serializers import PopulatedCommentSerializer
User = get_user_model()

class ForumSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Forum
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

    

class PopulatedForumSerializer(ForumSerializer):
    forum_owner = UserSerializer()

    

