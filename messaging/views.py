# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from django.db.models import Q

from .serializers import MessagingSerializer, PopulatedMessagingSerializer
from .models import Messaging


class MessagingDetailView(APIView):
    def post(self,request, pk):
        print(request)
        request.data['reciever'] = pk
        request.data['sender'] = request.user.id
        created_message = MessagingSerializer(data=request.data)
        if created_message.is_valid():
            created_message.save()
            return Response(created_message.data, status=HTTP_201_CREATED)
        return Response(created_message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def put(self, request, pk):
        message_to_read = Messaging.objects.get(pk=pk)
        update_message = MessagingSerializer(message_to_read, data=request.data)
        print(request.data)
        if update_message.is_valid():
            update_message.save()
            return Response(update_message.data, status=HTTP_200_OK)
        return Response(update_message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        
