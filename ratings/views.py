# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY,HTTP_200_OK
from rest_framework.exceptions import NotFound
from django.db.models import Avg


from .serializers import RatingSerializer,PopulatedRatingSerializer
from jwt_auth.serializers import UserSerializer
from jwt_auth.models import User
from .models import Ratings


class RatingListView(APIView):

    def post(self, request, pk):
        request.data['owner'] = request.user.id
        request.data['rated'] = pk
        created_rating = RatingSerializer(data=request.data)
        if created_rating.is_valid():
            created_rating.save()
            return Response(created_rating.data, status=HTTP_201_CREATED)
        return Response(created_rating.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    
    def get_user(self, _request, pk):
        user = User.objects.get(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)


    # GET USERS AVERAGE RATING
    def get(self, request, pk):
        user_rating = Ratings.objects.filter(rated=pk).aggregate(Avg('rating'))
        return Response(user_rating, status=HTTP_200_OK)
    
    

