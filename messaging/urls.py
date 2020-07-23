from django.urls import path
from .views import MessagingDetailView, MessagingListView


urlpatterns = [
    path('', MessagingListView.as_view()),
    path('<int:pk>/', MessagingDetailView.as_view()),
]