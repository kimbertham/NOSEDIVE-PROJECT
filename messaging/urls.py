from django.urls import path
from .views import MessagingDetailView


urlpatterns = [
    path('<int:pk>/', MessagingDetailView.as_view()),
]