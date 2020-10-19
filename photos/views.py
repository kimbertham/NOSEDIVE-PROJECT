# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from .models import Photos
from .serializers import PhotoSerializer, PopulatedPhotosSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
# Create your views here.

class PhotosListView(APIView):

    #create a new photo
    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['owner'] = request.user.id
        created_photo = PhotoSerializer(data=request.data)
        print(request.data)
        if created_photo.is_valid():
            created_photo.save()
            return Response(created_photo.data, status=HTTP_201_CREATED)
        return Response(created_photo.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PhotosDetailView(APIView):
            #get all one users photos 
    # def get(self, request, pk):
    #     photos = Photos.objects.filter(owner=pk)
    #     serailized_photos = PhotoSerializer(photos, many=True)
    #     return Response( serailized_photos.data , status=HTTP_200_OK)

    def delete(self, request, pk):
        photo_to_delete = Photos.objects.get(pk=pk)
        if photo_to_delete.owner.id != request.user.id:
            raise PermissionDenied()
        photo_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)

