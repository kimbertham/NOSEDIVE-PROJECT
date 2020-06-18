from django.urls import path
from .views import  CommentDetailView, CommentProfileView

urlpatterns = [
    path('<int:pk>/<int:id>/', CommentDetailView.as_view()),
    path('profile/<int:pk>/', CommentProfileView.as_view())
]