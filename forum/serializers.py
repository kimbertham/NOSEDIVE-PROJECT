# pylint: disable=import-error
from django.shortcuts import render
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Forum, ForumComments
from comments.serializers import PopulatedCommentSerializer
from rest_framework_recursive.fields import RecursiveField
User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name','last_name', 'profile_image')


class ForumSerializer(serializers.ModelSerializer):
    created_at=serializers.DateTimeField(format='%d-%m-%Y %H:%M',  read_only=True)

    class Meta:
        model = Forum
        fields = '__all__'

class PopulatedForumSerializer(ForumSerializer):
    forum_owner = UserSerializer()




#THREAD COMMENTS ----

class ForumCommentSerializerPOST(serializers.ModelSerializer):
    class Meta:
        model = ForumComments
        fields = ('__all__')

class ForumCommentSerializer(serializers.ModelSerializer):
    # created_at=serializers.DateTimeField(format='%d-%m-%Y %H:%M')

    children = RecursiveField(many=True)
    class Meta:
        model = ForumComments
        fields = ('id','content','created_at','comment_owner','forum','parent','children')

class PopulatedForumCommentSerializer(ForumCommentSerializer):
    comment_owner = UserSerializer()


