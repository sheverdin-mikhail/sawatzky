from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (
    User,
    Employee,
    Application,
    Client,
    LegalEntity,
    WorkObjectsGroup,
    WorkObject,
    WorkMaterial,
    WorkTask,
    WorkTaskGroup,
    WorkMaterialGroup,
    ApplicationWorkTask,
    ApplicationWorkMaterial,
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


class WorkMaterialSerializer(ModelSerializer):
    # Сериализатор модели WorkMaterial
    class Meta:
        model = WorkMaterial
        fields = '__all__'


'''WorkTask'''
class WorkTaskSerializer(ModelSerializer):
    # Сериализатор модели WorkTask
    class Meta:
        model = WorkTask
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


class UserRegistrationSerializer(serializers.ModelSerializer):
    # Сериализатор для регистрации пользователя
    fio = serializers.CharField()
    phoneNumber = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password', 'fio', 'phoneNumber']


class EmployeeWithUserUPSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера, password + username
    user = UserRegistrationSerializer(write_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeWithUserSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


class ApplicationWorkTaskSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы с actualTime
    workTask = WorkTaskSerializer(read_only=True, many=False)
    class Meta:
        model = ApplicationWorkTask
        fields = ['actualTime', 'workTask']


class ApplicationWorkMaterialSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы с actualCount
    workMaterial = WorkMaterialSerializer(read_only=True, many=False)
    class Meta:
        model = ApplicationWorkMaterial
        fields = ['actualCount', 'workMaterial']


class ApplicationWithCreatorSerializer(ModelSerializer):
    # Сериализаатор для вывода списка заявок с расширенным полем creator
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
    workTasks = ApplicationWorkTaskSerializer(read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        fields = '__all__'


class ApplicationSerializer(ModelSerializer):
    # Сериализаатор для создания/удаления/обновления заявки
    workTasks = ApplicationWorkTaskSerializer(read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        many=False
        fields = '__all__'


class ClientWithCLWWSerializers(ModelSerializer):
    # Сериализатор для вывода списка клиентов с расширенным полем creator, legalEntity, workObject, workObjectsGroup
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
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

'''WorkTaskGroup'''
class WorkTaskGroupWithWorkTaskSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп услуг с расширенным полем workTask
    tasks = WorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = WorkTaskGroup
        fields = '__all__'


class WorkTaskGroupSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп услуг

    class Meta:
        model = WorkTaskGroup
        fields = '__all__'


'''WorkMaterialGroup'''
class WorkMaterialGroupWithWorkMaterialSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп материалов с расширенным полем workMaterial
    materials = WorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = WorkMaterialGroup
        fields = '__all__'


class WorkMaterialGroupSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп материалов

    class Meta:
        model = WorkMaterialGroup
        fields = '__all__'


class ApplicationUpdateWorkTaskSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы с actualTime для обновления
    workTask = WorkTaskSerializer(read_only=True, many=False)
    class Meta:
        model = ApplicationWorkTask
        fields = ['actualTime']


class ApplicationUpdateWorkMaterialSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы с actualCount для обновления
    workMaterial = WorkMaterialSerializer(read_only=True, many=False)
    class Meta:
        model = ApplicationWorkMaterial
        fields = ['actualCount']


class ApplicationWithWorkTasksWorkMaterialsUpdateSerializer(ModelSerializer):
    # Сериализаатор для обновления заявок с расширенными полями workTasks, workMaterials
    workTasks = ApplicationUpdateWorkTaskSerializer(many=True)
    workMaterials = ApplicationUpdateWorkMaterialSerializer(many=True)

    class Meta:
        model = Application
        fields = ['workTasks', 'workMaterials']