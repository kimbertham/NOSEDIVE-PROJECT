from django.urls import path
from .views import RatingListView, RatingDetailView

urlpatterns = [
    path('<str:action>/<int:pk>/', RatingDetailView.as_view()),
    path('<int:pk>/', RatingListView.as_view()),
]
