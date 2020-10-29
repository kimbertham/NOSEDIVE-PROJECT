# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY,HTTP_200_OK
from rest_framework.exceptions import NotFound
from django.db.models import Avg, Sum
import math
from django.db.models import Count

from .serializers import RatingSerializer,PopulatedRatingSerializer
from jwt_auth.serializers import UserSerializer
from jwt_auth.models import User
from .models import Ratings
from postRatings.models import PostRatings


class RatingListView(APIView):

    def post(self, request, pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['rated'] = pk
        request.data['owner'] = request.user.id
        print(request.data)
        created_rating = RatingSerializer(data=request.data)
        if created_rating.is_valid():
            created_rating.save()
            return Response(created_rating.data,status=HTTP_201_CREATED)
        return Response( created_rating.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def ratings(self, request, pk):
        users_ratings = Ratings.objects.filter(rated_id=pk).order_by('-created_at')
        serailized_ratings = PopulatedRatingSerializer(users_ratings, many=True)
        return serailized_ratings.data
        
    
    def average(self, request, pk):
        user_profile_ratings = Ratings.objects.filter(rated=pk).aggregate(Avg('rating'))
        user_post_ratings = PostRatings.objects.filter(post_owner=pk).aggregate(Avg('rating'))
        if user_profile_ratings['rating__avg'] and user_post_ratings['rating__avg']:
            user_rating_score = (user_profile_ratings['rating__avg'] + user_post_ratings['rating__avg']) / 2
        elif not user_profile_ratings['rating__avg'] and not user_post_ratings['rating__avg']:
            user_rating_score = 0
        elif not user_profile_ratings['rating__avg']:
            user_rating_score = user_post_ratings['rating__avg']
        elif not user_post_ratings['rating__avg']:
            user_rating_score = user_profile_ratings['rating__avg']
        return user_rating_score



class RatingStatsView(APIView):
    def get(self, request, pk):
        print('got')
        feedback= Ratings.objects.filter(rated=pk).values('feedback').annotate(rating_count=Count('feedback')).exclude(feedback="")
        date=Ratings.objects.filter(rated=pk).values('created_at').annotate(rating_count=Count('rating')).order_by('created_at')
        return Response({'date': date, 'feedback': feedback }  , status=HTTP_200_OK)

