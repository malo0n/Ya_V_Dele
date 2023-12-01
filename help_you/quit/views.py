from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, CreateAPIView
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
