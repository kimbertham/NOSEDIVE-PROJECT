from django.urls import path
from .views import ForumListView, ThreadCommentView, ThreadView, ForumFollowView, ForumNewsfeedView


urlpatterns = [
    path('', ForumListView.as_view()),
    path('follow/<int:pk>/', ForumFollowView.as_view()),
    path('newsfeed/<int:pk>/',ForumNewsfeedView.as_view()),
    path('thread/<int:pk>/',ThreadView.as_view()),
    path('<int:forum_id>/',ThreadCommentView.as_view()),
    path('<int:forum_id>/<int:parent_id>/',ThreadCommentView.as_view())
]