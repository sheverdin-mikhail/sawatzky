from rest_framework.serializers import ModelSerializer
from .models import (
    User,
    Employee,
    Application
)



class EmployeeSerializer(ModelSerializer):
    #Сериализатор модели расширяющей профиль пользователя
    class Meta:
        model = Employee
        fields = '__all__'


class UserSerializer(ModelSerializer):
    #Сериализатор модели пользователя для отображения данных о нем
    employee = EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber', 'employee']


class UserSerializerWithoutEmployee(ModelSerializer):
    #Сериализатор модели пользователя без поля Employee

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber']


class EmployeeSerializer(ModelSerializer):
    #Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


class ApplicationWithCreatorSerializer(ModelSerializer):
    #Сериализаатор для вывода списка заявок с расширенным полем creator
    creator =  EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = Application
        fields = '__all__'


class ApplicationSerializer(ModelSerializer):
    #Сериализаатор для создания/удаления заявки

    class Meta:
        model = Application
        many=False
        fields = '__all__'


