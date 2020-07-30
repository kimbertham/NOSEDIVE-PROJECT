from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Conversations
User = get_user_model()

class ConversationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conversations
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name', 'profile_image',)

class PopulatedConversationsSerializer(ConversationsSerializer):
    participants = UserSerializer(many=True)


