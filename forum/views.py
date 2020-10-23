
# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
from django.db.models import Q

from django.contrib.auth import get_user_model
from .models import Forum, ForumComments,ForumFollow
from .serializers import ForumFollowSerializer, PopulatedForumSerializer,ForumSerializer, ForumCommentSerializer, PopulatedForumCommentSerializer,ForumCommentSerializerPOST
User = get_user_model()

class  ForumListView(APIView):

    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['forum_owner'] = request.user.id
        created_forum = ForumSerializer(data=request.data)
        if created_forum.is_valid():
            created_forum.save()
            return Response(created_forum.data, status=HTTP_201_CREATED)
        return Response(created_forum.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request):
        threads = Forum.objects.all().order_by('-id')
        serialized_forum = PopulatedForumSerializer(threads, many=True)
        return Response( serialized_forum.data , status=HTTP_200_OK)

class ForumFollowView(APIView):

    def post( self,request, pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['forum'] = pk
        request.data['follower'] = request.user.id
        cf = ForumFollowSerializer(data=request.data)
        if cf.is_valid():
            cf.save()
            return Response( cf.data , status=HTTP_201_CREATED)
        return Response(cf.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete( self,request, pk):
        cf_to_delete=ForumFollow.objects.filter(Q(forum=pk) & Q(follower=request.user.id))
        cf_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class  ThreadView(APIView):
    def get(self, request, pk):
        thread = Forum.objects.filter(pk=pk)
        serialized_forum = PopulatedForumSerializer(thread,many=True)
        return Response( serialized_forum.data , status=HTTP_200_OK)


class ThreadCommentView(APIView):
#get all comments for one thread 
    def get(self,request,forum_id):
            Thread_comments = ForumComments.objects.filter(forum_id=forum_id)
            comments = Thread_comments.filter(parent__isnull=True)
            serialized_comments = PopulatedForumCommentSerializer(comments, many=True)
            return Response ( serialized_comments.data , status=HTTP_200_OK)

    def delete(self, request, forum_id):
        comment_to_delete = ForumComments.objects.get(pk=forum_id)
        if comment_to_delete.comment_owner.id != request.user.id:
            raise PermissionDenied()
        comment_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def post(self, request, forum_id, parent_id):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['comment_owner'] = request.user.id
        request.data['forum'] = forum_id
        if parent_id == 0:
            parent_id = None
        request.data['parent'] = parent_id
        created_comment = ForumCommentSerializerPOST(data=request.data)
        if created_comment.is_valid():
            created_comment.save()
            return Response(created_comment.data, status=HTTP_201_CREATED)
        return Response(created_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class ForumNewsfeedView(APIView):

    def get(self,request,pk): 
            forums = ForumFollow.objects.filter(follower=pk).values_list('forum_id', flat=True)
            forum_comments = ForumComments.objects.filter(forum_id__in=forums).order_by('-created_at')[0:5]
            serialized_comments = PopulatedForumCommentSerializer(forum_comments, many=True)
            return Response( serialized_comments.data)

