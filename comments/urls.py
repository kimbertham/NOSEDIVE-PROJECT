from django.urls import path
from .views import  CommentDetailView, CommentView

urlpatterns = [
    path('<int:pk>/<int:id>/', CommentDetailView.as_view()),
    path('<int:pk>/', CommentView.as_view())
]