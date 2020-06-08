from django.urls import path
from .views import PostRatingListView

urlpatterns = [
    path('profile/<int:id>/post/<int:pk>', PostRatingListView.as_view())
]