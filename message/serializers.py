from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Message
from comments.serializers import PopulatedCommentSerializer
User = get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

    

class PopulatedMessageSerializer(MessageSerializer):
    reciever = UserSerializer()
    sender= UserSerializer
    

