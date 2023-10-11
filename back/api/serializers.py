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
        fields = ['id', 'fio', 'phone_number', 'employee']


class UserSerializerWithoutEmployee(ModelSerializer):
    #Сериализатор модели пользователя без поля Employee

    class Meta:
        model = User
        fields = ['id', 'fio', 'phone_number']


class EmployeeSerializer(ModelSerializer):
    #Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


class ApplicationListSerializer(ModelSerializer):
    #Сериализаатор для вывода списка заявок
    creator =  EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = Application
        fields = '__all__'


class ApplicationCreateSerializer(ModelSerializer):
    #Сериализаатор для создания заявки

    class Meta:
        model = Application
        fields = '__all__'