# pylint: disable=no-member, no-self-use
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
import random
from django.db.models import Q

from .models import Contact
from .serializers import UserSerializer, PopulatedFollowingSerializer, PopulatedFollowerSerializer
from jwt_auth.models import User
from jwt_auth.serializers import BasicUserSerializer


User = get_user_model()

class FollowDetailView(APIView):
    def post(self,request, action, pk):
        followed_user = User.objects.get(pk=pk)
        current_user= User.objects.get(pk=request.user.id)
        if action == 'following':
            Contact.objects.get_or_create(user_from=current_user, user_to=followed_user)
            return Response( f' {current_user.first_name} followed {followed_user.first_name}', status=HTTP_200_OK)
        if action == 'unfollowing':
            Contact.objects.filter(user_from=current_user, user_to=followed_user).delete()
            return Response( f' {current_user.first_name} unfollowed {followed_user.first_name}', status=HTTP_200_OK)

    # GET ALL ONE USERS FOLLOWERS OR FOLLOWING
    def get(self, request, action, pk):
        following = Contact.objects.filter(user_from=pk)
        if action == 'contact':
            serialized_following = PopulatedFollowingSerializer(following, many=True)
            followers = Contact.objects.filter(user_to=pk)
            serialized_followers = PopulatedFollowerSerializer(followers, many=True)
            return {'following':serialized_following.data, 'followers':serialized_followers.data}
# GET RANDOM FRIENDS FOR A USER 
        if action == 'find':
            ids = following.values_list('user_to', flat=True)
            random_users = []
            while len(random_users) < 2:
                randoms_followers =  Contact.objects.filter(user_from=random.choice(ids))
                if len(randoms_followers) > 0:
                    random_user = User.objects.get(pk=(random.choice(randoms_followers)).user_to.id)
                    if random_user.id != pk and not Contact.objects.filter(Q(user_from=pk) & Q(user_to=random_user.id)).exists() and not random_user in random_users:
                        random_users.append(random_user)
            serialized_users = BasicUserSerializer(random_users, many=True)
        return Response( serialized_users.data, status=HTTP_200_OK)
        
        



