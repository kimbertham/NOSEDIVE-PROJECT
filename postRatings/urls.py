from django.urls import path
from .views import PostRatingListView

urlpatterns = [
    path('<int:pk>/<int:id>/', PostRatingListView.as_view())
]