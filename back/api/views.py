from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User


from .serializers import (
    UserSerializer,
    ApplicationWithCreatorSerializer,
    ApplicationSerializer,
    ClientWithCLWWSerializers,
    ClientSerializers,
    LegalEntitySerializer,
    WorkObjectsGroupSerializer,
    WorkObjectsGroupWithWorkObjectSerializer,
    WorkMaterialSerializer,
    WorkTaskSerializer,
    WorkTaskGroupSerializer,
    WorkTaskGroupWithWorkTaskSerializer,
    WorkMaterialGroupSerializer,
    WorkMaterialGroupWithWorkMaterialSerializer,
    WorkObjectSerializer,
    EmployeeWithUserSerializer,
    EmployeeSerializer,
    EmployeeWithUserUPSerializer,
    UserRegistrationSerializer,
)

from .models import (
    User,
    Employee,
    Application,
    Client,
    LegalEntity,
    WorkObjectsGroup,
    WorkMaterial,
    WorkTask,
    WorkTaskGroup,
    WorkMaterialGroup,
    WorkObject,
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

        try:
            pk = self.kwargs['pk']
            applications = Application.objects.filter(id=pk)
            return applications

        except (KeyError, Application.DoesNotExist):
            return Response({'message': 'Заявка не найдена'}, status=status.HTTP_404_NOT_FOUND)


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

        try:
            pk = self.kwargs['pk']
            clients = Client.objects.filter(id=pk)
            return clients

        except (KeyError, Client.DoesNotExist):
            return Response({'message': 'Клиент не найден'}, status=status.HTTP_404_NOT_FOUND)


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


"""WorkObjectsGroup"""
class WorkObjectsGroupCreateView(generics.CreateAPIView):
    # представление на создание групп рабочих объектов
    queryset = WorkObjectsGroup.objects.all()
    serializer_class = WorkObjectsGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkObjectsGroupListView(generics.ListAPIView):
    # представление на создание и вывод списка групп рабочих объектов
    queryset = WorkObjectsGroup.objects.all()
    serializer_class = WorkObjectsGroupWithWorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkObjectsGroupDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка групп рабочих объектов по id
    serializer_class = WorkObjectsGroupWithWorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workObjectsGroups = WorkObjectsGroup.objects.filter(id=pk)
            return workObjectsGroups

        except (KeyError, WorkObjectsGroup.DoesNotExist):
            return Response({'message': 'Группа рабочих обьектов не найдена'}, status=status.HTTP_404_NOT_FOUND)


"""WorkMaterial"""
class WorkMaterialCreateView(generics.CreateAPIView):
    # представление на создание рабочих материалов для проведения работ
    queryset = WorkMaterial.objects.all()
    serializer_class = WorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkMaterialListView(generics.ListAPIView):
    # представление на создание и вывод списка рабочих материалов для проведения работ
    queryset = WorkMaterial.objects.all()
    serializer_class = WorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkMaterialDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление рабочих материалов для проведения работ по id
    serializer_class = WorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workMaterial = WorkMaterial.objects.filter(id=pk)
            return workMaterial

        except (KeyError, WorkMaterial.DoesNotExist):
            return Response({'message': 'Рабочие материалы для проведения работ не найдены'}, status=status.HTTP_404_NOT_FOUND)


"""WorkTask"""
class WorkTaskCreateView(generics.CreateAPIView):
    # представление на создание работ проводимых на объекте
    queryset = WorkTask.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkTaskSerializer

    def post(self, request, *args, **kwargs):

        try:
            group = WorkTaskGroup.objects.get(id=request.data['workTaskGroup'])
            newWorkTaskSerializer = self.get_serializer(data=request.data)
            newWorkTask = newWorkTaskSerializer.is_valid(raise_exception=True)
            newWorkTask = newWorkTaskSerializer.save()
            group.tasks.add(newWorkTask)
            group.save()
            return Response(newWorkTaskSerializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)


class WorkTaskListView(generics.ListAPIView):
    # представление на создание и вывод списка работ проводимых на объекте
    queryset = WorkTask.objects.all()
    serializer_class = WorkTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkTaskDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление работ проводимых на объекте по id
    serializer_class = WorkTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workTask = WorkTask.objects.filter(id=pk)
            return workTask

        except (KeyError, WorkTask.DoesNotExist):
            return Response({'message': 'Работы проводимые на объекте не найдены'}, status=status.HTTP_404_NOT_FOUND)



"""WorkTaskGroup"""
class WorkTaskGroupCreateView(generics.CreateAPIView):
    # представление на создание групп услуг
    queryset = WorkTaskGroup.objects.all()
    serializer_class = WorkTaskGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkTaskGroupListView(generics.ListAPIView):
    # представление на создание и вывод списка групп услуг
    queryset = WorkTaskGroup.objects.all()
    serializer_class = WorkTaskGroupWithWorkTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkTaskGroupDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление групп услуг по id
    serializer_class = WorkTaskGroupWithWorkTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workTaskGroup = WorkTaskGroup.objects.filter(id=pk)
            return workTaskGroup

        except (KeyError, WorkTask.DoesNotExist):
            return Response({'message': 'Группы услуг не найдены'}, status=status.HTTP_404_NOT_FOUND)



"""WorkMaterialGroup"""
class WorkMaterialGroupCreateView(generics.CreateAPIView):
    # представление на создание групп услуг
    queryset = WorkMaterialGroup.objects.all()
    serializer_class = WorkMaterialGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkMaterialGroupListView(generics.ListAPIView):
    # представление на создание и вывод списка групп услуг
    queryset = WorkMaterialGroup.objects.all()
    serializer_class = WorkMaterialGroupWithWorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkMaterialGroupDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление групп услуг по id
    serializer_class = WorkMaterialGroupWithWorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workMaterialGroup = WorkMaterialGroup.objects.filter(id=pk)
            return workMaterialGroup

        except (KeyError, WorkMaterial.DoesNotExist):
            return Response({'message': 'Группы услуг не найдены'}, status=status.HTTP_404_NOT_FOUND)


"""WorkObject"""
class WorkObjectCreateView(generics.CreateAPIView):
    # представление на создание рабочего объекта
    queryset = WorkObject.objects.all()
    serializer_class = WorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkObjectListView(generics.ListAPIView):
    # представление на создание и вывод списка рабочих объектов
    queryset = WorkObject.objects.all()
    serializer_class = WorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkObjectDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление рабочих объектов по id
    serializer_class = WorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            workObject = WorkObject.objects.filter(id=pk)
            return workObject

        except (KeyError, WorkObject.DoesNotExist):
            return Response({'message': 'Рабочий объект не найден'}, status=status.HTTP_404_NOT_FOUND)


"""Employee"""
class EmployeeCreateView(generics.CreateAPIView):
    # представление на создание расширения модели пользователя, после регистрации user
    queryset = Employee.objects.all()
    serializer_class = EmployeeWithUserUPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):

        try:
            user_data = request.data.get('user')
            user_serializer = UserRegistrationSerializer(data=user_data)
            user_serializer.is_valid(raise_exception=True)

            username = user_data.get('username')
            password = user_data.get('password')

            user = User.objects.create_user(username=username, password=password, **user_data)

            employee_data = request.data.copy()
            employee_data['user'] = user.id

            employee_serializer = self.get_serializer(data=employee_data)
            employee_serializer.is_valid(raise_exception=True)

            employee = employee_serializer.save()

            return Response(status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)

    # def post(self, request, *args, **kwargs):
    #
    #     try:
    #         legal_entity_id = LegalEntity.objects.get(id=request.data['legalEntity'])
    #         role = request.data.get('role')
    #         fio = request.data.get('fio')
    #         username = request.data.get('username')
    #         password = request.data.get('password')
    #
    #         newEmployeeSerializer = self.get_serializer(data=request.data)
    #         newEmployee = newEmployeeSerializer.is_valid(raise_exception=True)
    #         newEmployee = newEmployeeSerializer.save()
    #
    #         user = User.objects.create_user(username=username, password=password)
    #
    #         newEmployee = Employee(legalEntity=legal_entity_id, user=user, role=role, fio=fio)
    #         newEmployee.save()
    #
    #         return Response(newEmployeeSerializer.data, status=status.HTTP_201_CREATED)
    #
    #     except ValidationError as error:
    #         return Response(error.detail, status=error.status_code)