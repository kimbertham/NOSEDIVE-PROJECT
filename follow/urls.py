from django.urls import path
from .views import  FollowDetailView


urlpatterns = [
    path('<str:action>/<int:pk>/',FollowDetailView.as_view())
]