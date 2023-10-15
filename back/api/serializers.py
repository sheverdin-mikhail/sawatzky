from rest_framework.serializers import ModelSerializer
from .models import (
    User,
    Employee,
    Application,
    Client,
    LegalEntity,
    WorkObjectsGroup,
    WorkObject,
)



class EmployeeSerializer(ModelSerializer):
    # Сериализатор модели расширяющей профиль пользователя
    class Meta:
        model = Employee
        fields = '__all__'


class LegalEntitySerializer(ModelSerializer):
    # Сериализатор модели LegalEntity, расширяющей профиль клиента
    class Meta:
        model = LegalEntity
        fields = '__all__'


class WorkObjectSerializer(ModelSerializer):
    # Сериализатор модели WorkObject, расширяющей профиль клиента
    class Meta:
        model = WorkObject
        fields = '__all__'


class WorkObjectsGroupSerializer(ModelSerializer):
    # Сериализатор модели WorkObjectsGroup, расширяющей профиль клиента
    class Meta:
        model = WorkObjectsGroup
        fields = '__all__'


class UserSerializer(ModelSerializer):
    # Сериализатор модели пользователя для отображения данных о нем
    employee = EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber', 'employee']


class UserSerializerWithoutEmployee(ModelSerializer):
    # Сериализатор модели пользователя без поля Employee

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber']


class EmployeeSerializer(ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


class ApplicationWithCreatorSerializer(ModelSerializer):
    # Сериализаатор для вывода списка заявок с расширенным полем creator
    creator =  EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = Application
        fields = '__all__'


class ApplicationSerializer(ModelSerializer):
    # Сериализаатор для создания/удаления/обновления заявки

    class Meta:
        model = Application
        many=False
        fields = '__all__'


class ClientWithCLWWSerializers(ModelSerializer):
    # Сериализатор для вывода списка клиентов с расширенным полем creator, legalEntity, workObject, workObjectsGroup
    creator = EmployeeSerializer(read_only=True, many=False)
    legalEntity = LegalEntitySerializer(read_only=True, many=False)
    workObject = WorkObjectSerializer(read_only=True, many=False)
    workObjectsGroup = WorkObjectsGroupSerializer(read_only=True, many=True)

    class Meta:
        model = Client
        fields = '__all__'


class ClientSerializers(ModelSerializer):
    # Сериализатор для создания/удаления/обновления клиента

    class Meta:
        model = Client
        many = False
        fields = '__all__'


class WorkObjectsGroupWithWorkObjectSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп рабочих объектов с расширенным полем workObjects
    workObjects = WorkObjectSerializer(read_only=True, many=True)

    class Meta:
        model = WorkObjectsGroup
        fields = '__all__'