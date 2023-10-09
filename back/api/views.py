from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .serializers import (
    UserSerializer
)

from .models import (
    User,
    Employee
)


class AuthUserView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self):
        user = self.request.user
        if(user):
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Пользователь не найден'}, status=status.HTTP_200_OK)
    
class UserDetailView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self):
        pass