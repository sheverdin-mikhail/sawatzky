from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics

from .serializers import (
    UserSerializer,
    ApplicationWithCreatorSerializer,
    ApplicationSerializer,
    ClientWithCreatorSerializers,
    ClientSerializers,
)

from .models import (
    User,
    Employee,
    Application,
    Client,
)


class AuthUserView(APIView):
    # представление для аутентификации пользователя
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        user = self.request.user

        try:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class UserDetailView(APIView):
    # представление для пользователей, которые получаются по ID
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):

        user_id = kwargs.get('user_id')
        user = User.objects.get(id=user_id)

        try:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class ApplicationCreateView(generics.CreateAPIView):
    # представление на создание заявки
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    permission_classes = [IsAuthenticated]

class ApplicationListView(generics.ListAPIView):
    # представление на создание и вывод списка заявок
    serializer_class = ApplicationWithCreatorSerializer
    queryset = Application.objects.all()
    permission_classes = [IsAuthenticated]

class ApplicationDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка заявок по id создателя
    serializer_class = ApplicationWithCreatorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        pk = self.kwargs['pk']
        applications = Application.objects.filter(id=pk)
        return applications
    

class ClientCreateView(generics.CreateAPIView):
    # представление на создание клиента
    queryset = Client.objects.all()
    serializer_class = ClientSerializers
    permission_classes = [IsAuthenticated]

class ClientListView(generics.ListAPIView):
    # представление на создание и вывод списка клиентов
    queryset = Client.objects.all()
    serializer_class = ClientWithCreatorSerializers
    permission_classes = [IsAuthenticated]

class ClientDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка клиентов по id создателя
    serializer_class = ClientWithCreatorSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        pk = self.kwargs['pk']
        clients = Client.objects.filter(id=pk)
        return clients