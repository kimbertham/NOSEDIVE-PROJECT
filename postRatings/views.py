# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY,HTTP_200_OK
from rest_framework.exceptions import NotFound
from datetime import datetime

from .serializers import PostRatingSerializer,PopulatedPostRatingSerializer
from posts.serializers import PopulatedPostSerializer
from .models import PostRatings
from posts.models import Post


class PostRatingListView(APIView):

    
    def post(self, request, pk, id):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['post'] = pk
        request.data['post_owner'] = id
        request.data['rating_owner'] = request.user.id
        created_post_rating = PostRatingSerializer(data=request.data)
        if created_post_rating.is_valid():
            created_post_rating.save()
            return Response(created_post_rating.data,status=HTTP_201_CREATED)
        return Response( created_post_rating.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    #GET ALL RATINGS FOR ONE POST
    def get(self,request, pk, id):
        posts_ratings = PostRatings.objects.filter(post=pk)
        serailized_ratings = PopulatedPostRatingSerializer(posts_ratings, many=True)
        return Response(serailized_ratings.data, status=HTTP_200_OK)

class PostRatingsProfileView(APIView):
    #GET ALL ONE USERS POST RATINGS ON ALL POSTS
    def get(self,request,pk):
        users_ratings = PostRatings.objects.filter(post_owner=pk)
        sorted = users_ratings.order_by('created_at')
        serialized_ratings = PopulatedPostRatingSerializer(sorted,many=True)
        return Response(serialized_ratings.data, status=HTTP_200_OK)

