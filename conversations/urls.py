from django.urls import path
from .views import ConversationsListView
urlpatterns =[
    path('<int:pk>/', ConversationsListView.as_view())
]