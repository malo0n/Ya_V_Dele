from django.urls import path

from .views import *


urlpatterns = [
    path('api/register/', RegisterUserView.as_view()),
    path('api/habits/', BadHabitsListView.as_view()),
    path('api/profile/', ChangeUserView.as_view()),
    path('api/login/', CustomAuthToken.as_view()),
    path('api/chats/', UsersChatsView.as_view()),
    path('api/message/', MessagesView.as_view())
]

