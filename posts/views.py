# pylint: disable=no-member, no-self-use
from .serializers import PostSerializer
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
from django.db.models import Count


from .models import Post
from postRatings.models import PostRatings
from postRatings.serializers import PopulatedPostRatingSerializer
from follow.models import Contact
from .serializers import PopulatedPostSerializer

User = get_user_model()

# make a post
# get all the posts from one user 
class PostListView(APIView):

    def get(self, request):
        posts = Post.objects.all()
        newest_posts = posts.order_by('-created_at')
        serailized_newest_posts = PopulatedPostSerializer(newest_posts, many=True)
        top_rated_posts = PostRatings.objects.filter(rating=5).order_by('created_at')
        serailized_top_posts = PostSerializer(top_rated_posts, many=True)
        return Response(  serailized_newest_posts.data, status=HTTP_200_OK)

    

    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['owner'] = request.user.id
        created_post = PostSerializer(data=request.data)
        if created_post.is_valid():
            created_post.save()
            return Response(created_post.data, status=HTTP_201_CREATED)
        return Response(created_post.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PostDetailView(APIView):

        #GET ALL POSTS FROM ONE USER
    def get(self, request, pk):
        users_posts = Post.objects.filter(owner_id=pk)
        serailized_posts = PopulatedPostSerializer(users_posts, many=True)
        return Response(serailized_posts.data, status=HTTP_200_OK)
    
    # DELETE POST 
    #delete request, /api/posts/id
    def delete(self, request, pk):
        post_to_delete = Post.objects.get(pk=pk)
        if post_to_delete.owner.id != request.user.id:
            raise PermissionDenied()
        post_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)





