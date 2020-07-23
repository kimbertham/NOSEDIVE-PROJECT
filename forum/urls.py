from django.urls import path
from .views import ForumListView, ThreadCommentView, ThreadView


urlpatterns = [
    path('', ForumListView.as_view()),
    path('<int:pk>/',ThreadView.as_view()),
    path('<int:forum_id>',ThreadCommentView.as_view()),
    path('<int:forum_id>/<int:parent_id>',ThreadCommentView.as_view())
]