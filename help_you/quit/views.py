from django.contrib.auth import get_user_model
from django.utils import timezone
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
    last_login = timezone.now()
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
    serializer_class = UsersChatsSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_object(self):
        return USER.objects.get(auth_token=self.request.user.auth_token)
    

    def get_queryset(self):
        return self.request.user.chats.filter(user=self.request.user)
    

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        chats_ids = [chat.id for chat in self.get_queryset()]
        users_ids = list(
            USER.objects.filter(chats__in=chats_ids).values_list('id', flat=True)
            )
        for i in users_ids:
            if i == user.id:
                users_ids.remove(i)
        users = USER.objects.filter(id__in=users_ids)
        user_serializer = UsersChatsSerializer(users, many=True)
        for i in user_serializer.data:
            try:
                chats_list = i.get('chats')
                chat_id = [chat.id for chat in user.chats.filter(id__in=chats_list)]
                chat_id = ''.join(map(str, chat_id))
                i.update({'chats': chat_id})
                last_message = Chat.objects.get(
                    id=chat_id
                    ).messages.latest('departure_time')
                message_serializer = LastMessageSerializer(last_message)
                content = message_serializer.data.get('content')
                i.update({'last_message': content})
            except:
                pass
        return Response(user_serializer.data, status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        user_id = request.data.get('second_user_id', None)
        if not user_id:
            return Response(
                {
                    'detail':
                    'The request must specify the id of the second user'
                    }, status=status.HTTP_400_BAD_REQUEST)
        user = self.request.user
        try:
            second_user = USER.objects.get(id=user_id)
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
        chat = Chat.objects.create(second_user=second_user)
        user.chats.add(chat)
        second_user.chats.add(chat)
        new_user = USER.objects.filter(id=user_id)
        serializer = CreateUsersChatsSerializer(new_user, many=True)
        [i.update({'chat_id': chat.id}) for i in serializer.data]
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class AllUsersView(ListAPIView):
    serializer_class = AllUsersSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return USER.objects.get(auth_token=self.request.user.auth_token)
    

    def get_queryset(self):
        return USER.objects.exclude(id=self.get_object().id)
