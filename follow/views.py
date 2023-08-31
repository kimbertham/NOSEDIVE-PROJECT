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

'TEsTINGGG'

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
        print('testing recieve')
        following = Contact.objects.filter(user_from=pk)
        if action == 'contact':
            serialized_following = PopulatedFollowingSerializer(following, many=True)
            followers = Contact.objects.filter(user_to=pk)
            serialized_followers = PopulatedFollowerSerializer(followers, many=True)
            return {'following':serialized_following.data, 'followers':serialized_followers.data}
# GET RANDOM FRIENDS FOR A USER 
        if action == 'find':
            users = User.objects.all().exclude(id=request.user.id).values_list(flat=True)
            my_f = following.values_list('user_to', flat=True)
            non_f = list(set(users).difference(my_f))
            print(my_f)
            if len(non_f) > 0:
                followers = User.objects.filter(pk__in=non_f)
            if len(non_f) >= 3:
                chosen = random.sample( list(followers), 3)
                serialized_followers= BasicUserSerializer(chosen,many=True)
                return Response( serialized_followers.data, status=HTTP_200_OK)
            if len(non_f) == 2:
                chosen = random.sample( list(followers), 2)
                serialized_followers= BasicUserSerializer(chosen,many=True)
                return Response( serialized_followers.data, status=HTTP_200_OK)
            if len(non_f) == 1:
                chosen = random.sample( list(followers), 1)
                serialized_followers= BasicUserSerializer(chosen,many=True)
                return Response( serialized_followers.data, status=HTTP_200_OK)
            else:
                return Response( None , status=HTTP_200_OK)



