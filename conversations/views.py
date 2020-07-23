# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT

from .serializers import ConversationsSerializer, PopulatedConversationsSerializer
from .models import Conversations

# Create your views here.


class MessagingListView(APIView):   
    #get all conversations
    def get(self, request):
        conversations = Messaging.objects.all()
        serialized_messages = PopulatedMessagingSerializer(messages, many=True)
        return Response(serialized_messages.data, status=HTTP_200_OK)




