from django.urls import path
from .views import RatingListView, RatingStatsView

urlpatterns = [
    path('stats/<int:pk>/', RatingStatsView.as_view()),
    path('<int:pk>/', RatingListView.as_view()),
]
