from django.urls import path
from .views import RegisterView,LoginView, ProfileDetailView 

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<int:pk>', ProfileDetailView.as_view()),
    # path('follow/<int:pk>', FollowerDetailView.as_view())
]
