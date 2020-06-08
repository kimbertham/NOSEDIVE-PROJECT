from django.shortcuts import render
from .models import Comments
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')


class PopulatedCommentSerializer(CommentSerializer):
    comment_owner = UserSerializer()
    post_owner = UserSerializer()


