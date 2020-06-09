from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Photos

User = get_user_model()

class PhotoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Photos
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')

    

class PopulatedPhotosSerializer(PhotoSerializer):
    owner = UserSerializer()


