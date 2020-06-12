
# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
from django.contrib.auth import get_user_model
from .models import Forum
from .serializers import PopulatedForumSerializer,ForumSerializer
User = get_user_model()

class  ForumListView(APIView):


    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['forum_owner'] = request.user.id
        created_forum = ForumSerializer(data=request.data)
        print(request.data)
        if created_forum.is_valid():
            created_forum.save()
            return Response(created_forum.data, status=HTTP_201_CREATED)
        return Response(created_forum.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    #GET ALL FUSERS MESSAGES 
    def get(self, request):
        threads = Forum.objects.all().order_by('-id')
        serialized_forum = PopulatedForumSerializer(threads, many=True)
        return Response( serialized_forum.data , status=HTTP_200_OK)

