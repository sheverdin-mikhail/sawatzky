from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics

from .serializers import (
    UserSerializer,
    ApplicationWithCreatorSerializer,
    ApplicationSerializer
)

from .models import (
    User,
    Employee,
    Application
)


class AuthUserView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user
        if(user):
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Пользователь не найден'}, status=status.HTTP_200_OK)
   
    
class UserDetailView(APIView):
    # представления для пользователя, которые получаются по ID 
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        pass



class ApplicationCreateView(generics.CreateAPIView):
    # представление на создание и вывод списка заявок
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()


class ApplicationListView(generics.ListAPIView):
    # представление на создание и вывод списка заявок
    serializer_class = ApplicationWithCreatorSerializer
    queryset = Application.objects.all()


class ApplicationDetailView(generics.RetrieveDestroyAPIView):

    serializer_class = ApplicationWithCreatorSerializer

    def get_queryset(self):

        pk = self.kwargs['pk']
        applications = Application.objects.filter(id=pk)
        return applications
    