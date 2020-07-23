# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT

from .serializers import MessagingSerializer, PopulatedMessagingSerializer
from .models import Messaging

# Create your views here.


class MessagingListView(APIView):   
    #get all messages 
    def get(self, request):
        messages = Messaging.objects.all()
        serialized_messages = PopulatedMessagingSerializer(messages, many=True)
        return Response(serialized_messages.data, status=HTTP_200_OK)


class MessagingDetailView(APIView):
    #SEND A MESSAGE
    def post(self,request, pk):
        print(request)
        request.data['reciever'] = pk
        request.data['sender'] = request.user.id
        created_message = MessagingSerializer(data=request.data)
        if created_message.is_valid():
            created_message.save()
            return Response(created_message.data, status=HTTP_201_CREATED)
        return Response(created_message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

        #Get all one users messages 
    def get(self, request, pk):
        messages = Messaging.objects.filter(reciever=pk)
        serialized_messages = PopulatedMessagingSerializer(messages, many=True)
        return Response(serialized_messages.data, status=HTTP_200_OK)




