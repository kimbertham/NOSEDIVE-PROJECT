# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY,HTTP_200_OK

from .serializers import PostRatingSerializer
from .models import PostRatings


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


