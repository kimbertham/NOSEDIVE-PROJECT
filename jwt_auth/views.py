# pylint: disable=no-member, no-self-use
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
import jwt

from .serializers import UserSerializer, EditUserSerializer, BasicUserSerializer
from jwt_auth.models import User
from ratings.views import RatingListView
from photos.views import PhotosDetailView
from follow.views import FollowDetailView
from wishlist.views import WishlistDetailView
from posts.views import PostDetailView


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        else :
            return Response(serializer.errors, status=422)

class LoginView(APIView):
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentilais'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.get_user(username)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentails'})
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({'sub': user.id, 'exp': int(
            dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}'})


class ProfileDetailView(APIView):

    def get(self, request, pk, action):
        if action =='all': 
            users = User.objects.all()
            serialized_users = BasicUserSerializer(users, many=True)
            return Response(serialized_users.data, status=HTTP_200_OK)

        if action == 'photos':
            photos = PhotosDetailView.get(self, request, pk)
            return Response({ 'photos': photos}, status=HTTP_200_OK)
        if action == 'wishlist':
            wishlist = WishlistDetailView.get(self,request,pk)
            return Response({ 'wishlist': wishlist}, status=HTTP_200_OK)
        if action == 'follow':
            followers = FollowDetailView.get(self,request, 'contact', pk)
            return Response({ 'follow': followers }, status=HTTP_200_OK)
        if action == 'ratings':
            ratings = RatingListView.ratings(self, request, pk)
            return Response({ 'ratings': ratings}, status=HTTP_200_OK)
        if action == 'average':
            average = RatingListView.average(self, request, pk)
            return Response({ 'average': average}, status=HTTP_200_OK)
        if action == 'posts':
            posts = PostDetailView.get(self, request, pk)
            return Response({ 'posts': posts}, status=HTTP_200_OK)
        if action == 'bio':
            user = User.objects.get(pk=pk)
            serialized_user = EditUserSerializer(user)
            return Response({ 'bio': serialized_user.data}, status=HTTP_200_OK)

        if action == 'user':
            user = User.objects.get(pk=pk)
            serialized_user = UserSerializer(user)

            wishlist = WishlistDetailView.get(self,request,pk)
            followers = FollowDetailView.get(self,request, 'contact', pk)
            photos = PhotosDetailView.get(self, request, pk)
            ratings = RatingListView.ratings(self, request, pk)
            average = RatingListView.average(self, request, pk)
            posts = PostDetailView.get(self, request, pk)
            
            return Response({  
                'bio': serialized_user.data,
                'photos':photos,
                'follow': followers,
                'wishlist': wishlist,
                'ratings':ratings,
                'average': average,
                'posts':posts
                }, status=HTTP_200_OK)


    def put(self, request, pk, action):
        if action == 'edit':
            user = User.objects.get(pk=pk)
            update_user = EditUserSerializer(user, data=request.data)
            if update_user.is_valid():
                update_user.save()
                return Response(update_user.data, status=HTTP_200_OK)
            return Response(update_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

