# pylint: disable=no-member, no-self-use

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound,PermissionDenied
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT

from .models import Comments
from posts.models import Post
from .serializers import CommentSerializer,PopulatedCommentSerializer
from posts.serializers import PopulatedPostSerializer


class CommentsListView(APIView):

    # POST A COMMENT, POST REQUEST, /api/comment
    def post(self, request):
        request.data['owner'] = request.user.id
        created_comment = CommentSerializer(data=request.data)
        if created_comment.is_valid():
            created_comment.save()
            return Response(created_comment.data, status=HTTP_201_CREATED)
        return Response(created_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)



class CommentDetailView(APIView):

#GET ALL COMMENTS ON ONE POST 
    def get(self,request, pk):
        posts_comments = Post.objects.filter(id=pk)
        serailized_comments = PopulatedPostSerializer(posts_comments, many=True)
        return Response(serailized_comments.data, status=HTTP_200_OK)

    def get_comment(self, pk):
        try:
            return Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            raise NotFound()

    def is_comment_owner(self, comment, user):
        if comment.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        comment_to_delete = self.get_comment(pk)
        self.is_comment_owner(comment_to_delete, request.user)
        comment_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)




