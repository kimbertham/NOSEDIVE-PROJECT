# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied

from .serializers import ConversationsSerializer, PopulatedConversationsSerializer
from .models import Conversations

class ConversationsListView(APIView):   
    #get all conversations from one suer 
    def get(self, request, pk):
        conversations = Conversations.objects.filter(participants=pk)
        serialized_conversations = PopulatedConversationsSerializer(conversations, many=True)
        return Response(serialized_conversations.data, status=HTTP_200_OK)

#create new coonversation 
    def post(self,request,pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        print(request.data)
        userId = request.data['userId']
        request.data['participants'] = pk, userId
        created_convo =ConversationsSerializer(data=request.data)
        if created_convo.is_valid():
            created_convo.save()
            return Response(created_convo.data, status=HTTP_201_CREATED)
        return Response(created_convo.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
