# pylint: disable=no-member, no-self-use
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied

from .models import Contact
from .serializers import UserSerializer, PopulatedFollowingSerializer, PopulatedFollowerSerializer


User = get_user_model()

class FollowActionView(APIView):
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
        
        if action == 'contact':
            following = Contact.objects.filter(user_from=pk)
            serialized_following = PopulatedFollowingSerializer(following, many=True)
            followers = Contact.objects.filter(user_to=pk)
            serialized_followers = PopulatedFollowerSerializer(followers, many=True)
        return Response(({'following':serialized_following.data, 'followers':serialized_followers.data}), status=HTTP_200_OK)
