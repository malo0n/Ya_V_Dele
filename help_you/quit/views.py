from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import *
from .models import BadHabits
from .permisions import IsOwner


USER = get_user_model()


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
