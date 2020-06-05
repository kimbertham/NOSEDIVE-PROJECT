from django.urls import path
from .views import RatingListView

urlpatterns = [
    path('<int:pk>', RatingListView.as_view())
]
