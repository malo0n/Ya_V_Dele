# import jwt

# from django.conf import settings
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.authentication import AllowAny
from rest_framework import status

from .serializers import *
from .models import BadHabits
from .permisions import IsOwner


USER = get_user_model()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = USER.objects.all()
    permission_classes = (AllowAny, )


class LoginUserView(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(user.id, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        

class BadHabitsListView(ListAPIView):
    queryset = BadHabits.objects.all()
    serializer_class = BadHabitsSerializer
    # permission_classes = (IsAuthenticated, )


class ChangeUserView(RetrieveUpdateAPIView):
    queryset = USER.objects.all()
    serializer_class = ChangeUserSerializer
    # permission_classes = (IsAuthenticated, IsOwner)


# class ChangeUserViewSet(ModelViewSet):
#     serializer_class = ChangeUserSerializer
#     permission_classes = (IsAuthenticated, )

#     def get_queryset(self):
#         return USER.objects.filter(id=self.request.user.id)
        


# @api_view(['POST'])
# @permission_classes([AllowAny, ])
# def authenticate_user(request):
#     try:
#         email = request.data['email']
#         password = request.data['password']
#         user = USER.objects.get(email=email, password=password)
#         if user:
#             try:
#                 payload = jwt_payload_handler(user)
#                 token = jwt.encode(payload, settings.SECRET_KEY)
#                 user_details = {}
#                 user_details['name'] = "%s %s" % (
#                     user.first_name, user.last_name)
#                 user_details['token'] = token
#                 user_logged_in.send(sender=user.__class__,
#                                     request=request, user=user)
#                 return Response(user_details, status=status.HTTP_200_OK)
#             except Exception as e:
#                 raise e
#         else:
#             res = {
#                 'error': 'can not authenticate with the given credentials or the account has been deactivated'}
#             return Response(res, status=status.HTTP_403_FORBIDDEN)
#     except KeyError:
#         res = {'error': 'please provide a email and a password'}
#         return Response(res)