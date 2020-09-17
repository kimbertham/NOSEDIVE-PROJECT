from django.urls import path
from .views import PostListView,PostDetailView,NewsfeedListView

urlpatterns = [
    path('', PostListView.as_view()),
    path('<int:pk>/', PostDetailView.as_view()),
    path('newsfeed/<int:pk>/', NewsfeedListView.as_view())
]