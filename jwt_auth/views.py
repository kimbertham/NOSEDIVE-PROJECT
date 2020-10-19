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
from django.db.models import Avg, Sum

from .serializers import UserSerializer, EditUserSerializer, BasicUserSerializer
from jwt_auth.models import User
from photos.models import Photos
from photos.serializers import PhotoSerializer
from wishlist.models import Wishlist
from wishlist.serializers import WishlistSerializer
from follow.models import Contact
from follow.serializers import PopulatedFollowerSerializer, PopulatedFollowingSerializer
from posts.models import Post
from posts.serializers import PopulatedPostSerializer
from ratings.models import Ratings
from ratings.serializers import RatingSerializer, PopulatedRatingSerializer
from postRatings.models import PostRatings
from comments.models import Comments
from comments.serializers import PopulatedCommentSerializer


class RegisterView(APIView):
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
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
    # get own profile 
    def get(self, request, pk, action):
        if action =='all': 
            users = User.objects.all()
            serialized_users = BasicUserSerializer(users, many=True)
            return Response(serialized_users.data, status=HTTP_200_OK)
        if action == 'simple':
            user = User.objects.get(pk=pk)    
            serialized_user = UserSerializer(user)
            
            user_profile_ratings = Ratings.objects.filter(rated=pk).aggregate(Avg('rating'))
            user_post_ratings = PostRatings.objects.filter(post_owner=pk).aggregate(Avg('rating'))
            if user_profile_ratings['rating__avg'] and user_post_ratings['rating__avg']:
                user_rating_score = (user_profile_ratings['rating__avg'] + user_post_ratings['rating__avg']) / 2
            elif not user_profile_ratings['rating__avg']:
                user_rating_score = user_post_ratings['rating__avg']
            elif not user_post_ratings['rating__avg']:
                user_rating_score = user_profile_ratings['rating__avg']
            else: 
                user_rating_score = 0
            return Response({'bio': serialized_user.data, 'rating': user_rating_score }, status=HTTP_200_OK)

        if action == 'full':
            user = User.objects.get(pk=pk)
            serialized_user = UserSerializer(user)
            
            photos = Photos.objects.filter(owner=pk)
            serailized_photos = PhotoSerializer(photos, many=True)

            wishlist = Wishlist.objects.filter(owner=pk)
            serailized_wishlist = WishlistSerializer(wishlist, many=True)

            following = Contact.objects.filter(user_from=pk)
            serialized_following = PopulatedFollowingSerializer(following, many=True)

            followers = Contact.objects.filter(user_to=pk)
            serialized_followers = PopulatedFollowerSerializer(followers, many=True)

            user_profile_ratings = Ratings.objects.filter(rated=pk).aggregate(Avg('rating'))
            user_post_ratings = PostRatings.objects.filter(post_owner=pk).aggregate(Avg('rating'))
            if user_profile_ratings['rating__avg'] and user_post_ratings['rating__avg']:
                user_rating_score = (user_profile_ratings['rating__avg'] + user_post_ratings['rating__avg']) / 2
            elif not user_profile_ratings['rating__avg']:
                user_rating_score = user_post_ratings['rating__avg']
            elif not user_post_ratings['rating__avg']:
                user_rating_score = user_profile_ratings['rating__avg']
            else: 
                user_rating_score = 0
            users_ratings = Ratings.objects.filter(rated_id=pk).order_by('-created_at')
            serailized_ratings = PopulatedRatingSerializer(users_ratings, many=True)

            all_comments = Comments.objects.filter(comment_owner=pk)
            serailized_comments = PopulatedCommentSerializer(all_comments, many=True)

            return Response({  
                'bio': serialized_user.data,
                'ratings':serailized_ratings.data,
                'avg':user_rating_score,
                'comments':serailized_comments.data,
                'photos':serailized_photos.data,
                'following':serialized_following.data,
                'followers':serialized_followers.data,
                'wishlist':serailized_wishlist.data} , status=HTTP_200_OK)
        

    def put(self, request, pk, action):
        if action == 'edit':
            user = User.objects.get(pk=pk)
            update_user = EditUserSerializer(user, data=request.data)
            if update_user.is_valid():
                update_user.save()
                return Response(update_user.data, status=HTTP_200_OK)
            return Response(update_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

