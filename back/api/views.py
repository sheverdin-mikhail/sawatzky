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
    ClientWithCLWWSerializers,
    ClientSerializers,
    LegalEntitySerializer,

)

from .models import (
    User,
    Employee,
    Application,
    Client,
    LegalEntity,
)


"""User"""
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


"""Application"""
class ApplicationCreateView(generics.CreateAPIView):
    # представление на создание заявки
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class ApplicationListView(generics.ListAPIView):
    # представление на создание и вывод списка заявок
    serializer_class = ApplicationWithCreatorSerializer
    queryset = Application.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class ApplicationDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка заявок по id создателя
    serializer_class = ApplicationWithCreatorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        pk = self.kwargs['pk']
        applications = Application.objects.filter(id=pk)
        return applications
    


"""Client"""
class ClientCreateView(generics.CreateAPIView):
    # представление на создание клиента
    queryset = Client.objects.all()
    serializer_class = ClientSerializers
    permission_classes = [permissions.IsAuthenticated]

class ClientListView(generics.ListAPIView):
    # представление на создание и вывод списка клиентов
    queryset = Client.objects.all()
    serializer_class = ClientWithCLWWSerializers
    permission_classes = [permissions.IsAuthenticated]

class ClientDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка клиентов по id создателя
    serializer_class = ClientWithCLWWSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        pk = self.kwargs['pk']
        clients = Client.objects.filter(id=pk)
        return clients


"""LegalEntity"""
class LegalEntityCreateView(generics.CreateAPIView):
    # представление на создание Юр. лица
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntitySerializer
    permission_classes = [permissions.IsAuthenticated]

class LegalEntityListView(generics.ListAPIView):
    # представление на создание и вывод списка Юр. лиц
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntitySerializer
    permission_classes = [permissions.IsAuthenticated]

class LegalEntityDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление Юр. лица по id
    serializer_class = LegalEntitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            legalEntity = LegalEntity.objects.filter(id=pk)
            return legalEntity

        except (KeyError, LegalEntity.DoesNotExist):
            return Response({'message': 'Юр. лицо не найдено'}, status=status.HTTP_404_NOT_FOUND)

