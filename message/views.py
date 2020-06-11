# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied

from .models import Message


# make a post
# get all the posts from one user 
# class PostListView(APIView):

#     def get(self, request):
#         posts = Post.objects.all()
#         newest_posts = posts.order_by('-created_at')
#         serailized_newest_posts = PopulatedPostSerializer(newest_posts, many=True)
#         # top_rated_posts = PostRatings.objects.filter(rating=5).annotate(count=Count('post')).order_by('-count')
#         return Response( serailized_newest_posts.data , status=HTTP_200_OK)


#     def post(self,request):
#         if not request.POST._mutable:
#             request.POST._mutable = True
#         request.data['owner'] = request.user.id
#         created_post = PostSerializer(data=request.data)
#         if created_post.is_valid():
#             created_post.save()
#             return Response(created_post.data, status=HTTP_201_CREATED)
#         return Response(created_post.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)