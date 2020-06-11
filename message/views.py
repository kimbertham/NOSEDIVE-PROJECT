# # pylint: disable=no-member, no-self-use
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
# from rest_framework.exceptions import NotFound,PermissionDenied
# from django.contrib.auth import get_user_model
# from .models import Message
# from .serializers import PopulatedMessageSerializer
# User = get_user_model()

# class  MessageListView(APIView):

#     #GET ALL FUSERS MESSAGES 
#     def get(self, request,pk):
#         messages = Message.objects.filter(reciever=pk)
#         serialized_messages = PopulatedMessageSerializer(messages, many=True)
#         return Response( serialized_messages.data , status=HTTP_200_OK)

#     def post(self,request, pk):
#         if not request.POST._mutable:
#             request.POST._mutable = True

#         request.data['sender'] = request.user.id
#         request.data['reciever'] = 1
#         sent_message = PopulatedMessageSerializer(data=request.data)
#         if sent_message.is_valid():
#             sent_message.save()
#             return Response(sent_message.data, status=HTTP_201_CREATED)
#         return Response(sent_message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)