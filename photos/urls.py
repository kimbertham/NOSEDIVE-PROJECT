from django.urls import path
from .views import PhotosListView,PhotosDetailView

urlpatterns = [
    path('', PhotosListView.as_view()),
    path('<int:pk>/', PhotosDetailView.as_view()),

]