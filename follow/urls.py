from django.urls import path
from .views import  FollowActionView


urlpatterns = [
    # path('<int:pk>',FollowListView.as_view()),
    path('<str:action>/<int:pk>/',FollowActionView.as_view())
]