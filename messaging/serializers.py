from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Messaging
User = get_user_model()

class MessagingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Messaging
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

class PopulatedMessagingSerializer(MessagingSerializer):
    reciever = UserSerializer()
    sender = UserSerializer()

