from django.urls import path
from .views import PostRatingListView, PostRatingsProfileView

urlpatterns = [
    path('profile/<int:id>/post/<int:pk>', PostRatingListView.as_view()),
    path('<int:pk>', PostRatingsProfileView.as_view())
]