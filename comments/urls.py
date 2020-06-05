from django.urls import path
from .views import CommentsListView, CommentDetailView

urlpatterns = [
    path('', CommentsListView.as_view()),
    path('<int:pk>', CommentDetailView.as_view())
]