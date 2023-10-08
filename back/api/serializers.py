from rest_framework.serializers import ModelSerializer
from .models import (
    User,
    Employee,
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