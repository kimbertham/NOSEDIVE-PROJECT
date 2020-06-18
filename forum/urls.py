from django.urls import path
from .views import ForumListView, ForumDetailView

urlpatterns = [
    path('', ForumListView.as_view()),
    path('<int:pk>/', ForumDetailView.as_view())
]