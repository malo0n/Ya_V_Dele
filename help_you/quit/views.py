from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from datetime import datetime

from .serializers import *
from .models import BadHabits
from .permisions import IsOwner


USER = get_user_model()


class CustomAuthToken(ObtainAuthToken):
    last_login = datetime.now()
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        USER.objects.filter(username=user).update(last_login=self.last_login)
        return Response({
            'token': token.key,
            })


class RegisterUserView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = USER.objects.all()
    permission_classes = (AllowAny, )
        

class BadHabitsListView(ListAPIView):
    queryset = BadHabits.objects.all()
    serializer_class = BadHabitsSerializer
    permission_classes = (IsAuthenticated, )


class ChangeUserView(RetrieveUpdateAPIView):
    serializer_class = ChangeUserSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_object(self):
        return USER.objects.get(auth_token=self.request.user.auth_token)


class UsersChatsView(ListCreateAPIView):
    serializer_class = UsersChatsSerialiser
    permission_classes = (IsAuthenticated, IsOwner)

    def get_object(self):
        return USER.objects.get(auth_token=self.request.user.auth_token)
    

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)
    

    def create(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        if not username:
            return Response(
                {
                    'detail':
                    'The request must specify the username of the second user'
                    }, status=status.HTTP_400_BAD_REQUEST)
        user = self.request.user
        try:
            second_user = USER.objects.get(username=username)
        except USER.DoesNotExist:
            return Response(
                {
                    'detail':
                    'There is no such user'
                }, status=status.HTTP_404_NOT_FOUND)
        if user.chats.filter(id__in=second_user.chats.all()):
            return Response(
            {
                'detail':
                'Users already have a chat'
            }, status=status.HTTP_400_BAD_REQUEST)
        chat = Chat.objects.create()
        user.chats.add(chat)
        second_user.chats.add(chat)
        serializer = ChatsSerializer(chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


        
