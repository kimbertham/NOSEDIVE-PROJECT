# pylint: disable=no-member, no-self-use
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from rest_framework.exceptions import NotFound,PermissionDenied
from .models import Wishlist
from .serializers import WishlistSerializer

User = get_user_model()

class  WishlistView(APIView):

    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['owner'] = request.user.id
        created_wish = WishlistSerializer(data=request.data)
        if created_wish.is_valid():
            created_wish.save()
            return Response(created_wish.data, status=HTTP_201_CREATED)
        return Response(created_wish.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class WishlistDetailView(APIView):
#     def get(self, request, pk):
#         wishlist = Wishlist.objects.filter(owner=pk)
#         serailized_wishlist = WishlistSerializer(wishlist, many=True)
#         return Response( serailized_wishlist.data , status=HTTP_200_OK)

    def delete(self, request, pk):
        item_to_delete = Wishlist.objects.get(pk=pk)
        if item_to_delete.owner.id != request.user.id:
            raise PermissionDenied()
        item_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)
