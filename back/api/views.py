from django.shortcuts import render
from rest_framework.views import APIView
import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from django_filters.rest_framework import DjangoFilterBackend
from .filters import (
    ApplicationFilter,
    WorkTaskFilter,
    WorkMaterialFilter,
    LegalEntityFilter,
    SawatzkyEmployeeFilter,
)


from .serializers import (
    UserSerializer,
    ApplicationWithCreatorSerializer,
    ApplicationWorkMaterialSerializer,
    ApplicationSerializer,
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
    ApplicationWithWorkTasksWorkMaterialsUpdateSerializer,
    LegalEntityDetailSerializer,
    DocumentsSerializer,
    SawatzkyEmployeeSerializer,
    SawatzkyEmployeeWithWorkObjectSerializer,
    SawatzkyEmployeeWithoutworkingObjectsSerializer,
    SawatzkyEmployeeWithUserSerializer,
    LegalEntityOrClientLESerializer,
    LegalEntityListSerializer,
    EmployeeListSerializer,
    EmployeeDetailSerializer,

)

from .models import (
    User,
    Employee,
    Application,
    LegalEntity,
    WorkObjectsGroup,
    WorkMaterial,
    WorkTask,
    WorkTaskGroup,
    WorkMaterialGroup,
    WorkObject,
    Document,
    SawatzkyEmployee,
)


"""User"""
class AuthUserView(generics.RetrieveAPIView):
    # представление для аутентификации пользователя
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):

        try:
            user = self.get_object()
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class UserChangePasswordView(generics.UpdateAPIView):
    # Представление для смены пароля пользователя
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = self.request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'message': 'Старый пароль введен неверно'}, status=status.HTTP_400_BAD_REQUEST)

        if old_password == new_password:
            return Response({'message': 'Новый пароль совпадает со старым'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Пароль успешно изменен'}, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveDestroyAPIView):
    # представление для пользователей, которые получаются по ID
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        user = User.objects.get(id=user_id)

        try:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')

        try:
            user = self.get_queryset().get(id=user_id)
            user.delete()
            return Response({'message': 'Пользователь успешно удален'}, status=status.HTTP_204_NO_CONTENT)

        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


"""Application"""
channel_layer = get_channel_layer()
class ApplicationCreateView(generics.CreateAPIView):
    # представление на создание заявки
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        instance = serializer.save()
        work_object = instance.creator.legalEntity.workObject.id

        # group_name = f"sawatzky_dispatcher_{work_object}"
        # channel_layer.group_send(
        #     group_name,
        #     {'type': 'send_new_applications', 'data': json.dumps({'application': serializer.data})}
        # )

        channel_layer = get_channel_layer()
        channel_name = f"sawatzky_dispatcher_{work_object}"
        # channel_layer.group_send(
        #     channel_name,
        #     {'type': 'send_new_applications', 'data': json.dumps({'application': serializer.data})}
        # )

        try:
            data = {
                'action': 'create_application',
                'application_data': serializer.data,
            }
            async_to_sync(channel_layer.group_send)(
                channel_name,
                {
                    'type': 'send_application_notification',
                    'application_data': json.dumps(data['application_data'])
                }
            )
        except json.JSONDecodeError:
            pass

class ApplicationUpdateView(generics.UpdateAPIView):
    # представление на создание заявки
    serializer_class = ApplicationWithWorkTasksWorkMaterialsUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            applications = Application.objects.filter(id=pk)
            return applications

        except (KeyError, Application.DoesNotExist):
            return Response({'message': 'Заявка не найдена'}, status=status.HTTP_404_NOT_FOUND)

class ApplicationListView(generics.ListAPIView):
    # представление на создание и вывод списка заявок
    serializer_class = ApplicationWithCreatorSerializer
    queryset = Application.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ApplicationFilter


class ApplicationDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление списка заявок по id создателя
    serializer_class = ApplicationWithCreatorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            applications = Application.objects.filter(id=pk).order_by('-createdAt')
            return applications

        except (KeyError, Application.DoesNotExist):
            return Response({'message': 'Заявка не найдена'}, status=status.HTTP_404_NOT_FOUND)


# """Client"""
# class ClientCreateView(generics.CreateAPIView):
#     # представление на создание клиента
#     queryset = Client.objects.all()
#     serializer_class = ClientSerializers
#     permission_classes = [permissions.IsAuthenticated]
#
# class ClientListView(generics.ListAPIView):
#     # представление на создание и вывод списка клиентов
#     queryset = Client.objects.all()
#     serializer_class = ClientWithCLWWSerializers
#     permission_classes = [permissions.IsAuthenticated]
#
# class ClientDetailView(generics.RetrieveDestroyAPIView):
#     # представление на получение, обновление, удаление списка клиентов по id создателя
#     serializer_class = ClientWithCLWWSerializers
#     permission_classes = [permissions.IsAuthenticated]
#
#     def get_queryset(self):
#
#         try:
#             pk = self.kwargs['pk']
#             clients = Client.objects.filter(id=pk)
#             return clients
#
#         except (KeyError, Client.DoesNotExist):
#             return Response({'message': 'Клиент не найден'}, status=status.HTTP_404_NOT_FOUND)
#

"""LegalEntity"""
class LegalEntityCreateView(generics.CreateAPIView):
    # представление на создание Юр. лица
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntityOrClientLESerializer
    permission_classes = [permissions.IsAuthenticated]

class LegalEntityListView(generics.ListAPIView):
    # представление на создание и вывод списка Юр. лиц
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntityListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = LegalEntityFilter


class LegalEntityDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление Юр. лица по id
    serializer_class = LegalEntityDetailSerializer
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

    def post(self, request, *args, **kwargs):

        try:
            group = WorkMaterialGroup.objects.get(id=request.data['workMaterialGroup'])
            newWorkMaterialSerializer = self.get_serializer(data=request.data)
            newWorkMaterial = newWorkMaterialSerializer.is_valid(raise_exception=True)
            newWorkMaterial = newWorkMaterialSerializer.save()
            group.materials.add(newWorkMaterial)
            group.save()
            return Response(newWorkMaterialSerializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)


class WorkMaterialListView(generics.ListAPIView):
    # представление на создание и вывод списка рабочих материалов для проведения работ
    queryset = WorkMaterial.objects.all()
    serializer_class = WorkMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = WorkMaterialFilter

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
    filter_backends = (DjangoFilterBackend,)
    filterset_class = WorkTaskFilter

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

    def post(self, request, *args, **kwargs):

        try:
            group = WorkObjectsGroup.objects.get(id=request.data['workObjectGroup'])
            newWorkObjectSerializer = self.get_serializer(data=request.data)
            newWorkObject = newWorkObjectSerializer.is_valid(raise_exception=True)
            newWorkObject = newWorkObjectSerializer.save()
            group.workObjects.add(newWorkObject)
            group.save()
            return Response(newWorkObjectSerializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)

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
class EmployeeListView(generics.ListAPIView):
    # представление на создание и вывод списка пользователей
    serializer_class = EmployeeWithUserSerializer
    queryset = Employee.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class EmployeeDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление пользователей по id
    serializer_class = EmployeeDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            employee = Employee.objects.filter(id=pk)
            return employee

        except (KeyError, Employee.DoesNotExist):
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class EmployeeCreateView(generics.CreateAPIView):
    # представление на создание расширения модели пользователя, после регистрации user
    queryset = Employee.objects.all()
    serializer_class = EmployeeWithUserUPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        try:
            #Валидация
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            #Обработка данных
            user_data = request.data.pop('user')
            legalEntityId = request.data.pop('legalEntity')
            legalEntity = LegalEntity.objects.get(id=legalEntityId)

            if User.objects.filter(username=user_data['username']).exists():
                return Response({'message': 'Пользователь с таким именем уже существует'},
                                status=status.HTTP_400_BAD_REQUEST)

            #Создание и сохранение объектов
            user = User.objects.create_user(**user_data)
            employee = Employee.objects.create(user=user, legalEntity=legalEntity, **request.data)
            employee.save()
            employee_serializer = EmployeeWithUserSerializer(instance=employee)

            return Response(employee_serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)


"""Document"""
class DocumentsCreateView(generics.CreateAPIView):
    # представление на создание документов
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class DocumentsDetailView(generics.RetrieveDestroyAPIView):
    # представление на вывод списка рабочих объектов
    serializer_class = DocumentsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            doc = Document.objects.filter(id=pk)
            return doc

        except (KeyError, Document.DoesNotExist):
            return Response({'message': 'Документ не найден'}, status=status.HTTP_404_NOT_FOUND)


class DocumentToApplicationCreateView(generics.CreateAPIView):
    # представление на создание документа с привязкой к заявке
    serializer_class = DocumentsSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Document.objects.all()

    def create(self, request, *args, **kwargs):
        try:

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            document = serializer.save()

            application_pk = self.kwargs.get('pk')
            application = Application.objects.get(pk=application_pk)

            application.documents.add(document)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Application.DoesNotExist:
            return Response({'message': 'Заявка не найдена'}, status=status.HTTP_404_NOT_FOUND)



"""SawatzkyEmployee"""
class SawatzkyEmployeeCreateView(generics.CreateAPIView):
    # представление на создание расширенной модели пользователя Sawatzky, после регистрации user
    serializer_class = SawatzkyEmployeeSerializer
    queryset = SawatzkyEmployee.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user_data = request.data.pop('user')
            work_object_group_id = request.data.pop('workObjectGroup')
            work_object_group = WorkObjectsGroup.objects.get(id=work_object_group_id)
            work_object_id = request.data.pop('workObject')
            work_object = WorkObject.objects.get(id=work_object_id)

            if User.objects.filter(username=user_data['username']).exists():
                return Response({'message': 'Пользователь Sawatzky с таким именем уже существует'},
                                status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(**user_data)
            working_objects_data = request.data.pop('workingObjects', [])
            sawatzky_employee = SawatzkyEmployee.objects.create(user=user, workObjectGroup=work_object_group,
                                                                workObject=work_object, **request.data)

            sawatzky_employee.workingObjects.set(working_objects_data)

            sawatzky_employee.save()
            sawatzky_employee_serializer = SawatzkyEmployeeWithUserSerializer(instance=sawatzky_employee)

            return Response(sawatzky_employee_serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(error.detail, status=error.status_code)


class SawatzkyEmployeeListView(generics.ListAPIView):
    # представление на создание и вывод списка пользователей Sawatzky
    serializer_class = SawatzkyEmployeeWithoutworkingObjectsSerializer
    queryset = SawatzkyEmployee.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = SawatzkyEmployeeFilter


class SawatzkyEmployeeDetailView(generics.RetrieveDestroyAPIView):
    # представление на получение, обновление, удаление пользователей Sawatzky по id
    serializer_class = SawatzkyEmployeeWithWorkObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        try:
            pk = self.kwargs['pk']
            sawatzkyEmployee = SawatzkyEmployee.objects.filter(id=pk)
            return sawatzkyEmployee

        except (KeyError, SawatzkyEmployee.DoesNotExist):
            return Response({'message': 'Пользователь Sawatzky не найден'}, status=status.HTTP_404_NOT_FOUND)

