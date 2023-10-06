from rest_framework.serializers import ModelSerializer
from .models import (
    User,
    ClientMember,
    CompanyMember
)



class ClientMemberSerializer(ModelSerializer):
    #Сериализатор модели контрагента

    class Meta:
        model = ClientMember
        fields = '__all__'

class CompanyMemberSerializer(ModelSerializer):
    #Сериализатор модели сотрудника Swatzky
    class Meta:
        model = CompanyMember
        fields = '__all__'


class UserSerializer(ModelSerializer):
    #Сериализатор модели пользователя для отображения данных о нем
    client = ClientMemberSerializer(read_only=True, many=False)
    performer = CompanyMemberSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ['id', 'fio', 'phone_number', 'performer', 'client']