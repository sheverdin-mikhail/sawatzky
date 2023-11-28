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
    Document,
    SawatzkyEmployee,
)


'''Employee'''
class EmployeeSerializer(ModelSerializer):
    # Сериализатор модели расширяющей профиль пользователя
    class Meta:
        model = Employee
        fields = '__all__'


'''User'''
class UserSerializer(ModelSerializer):
    # Сериализатор модели пользователя для отображения данных о нем
    employee = EmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber', 'employee']


'''UserWithoutEmployee'''
class UserSerializerWithoutEmployee(ModelSerializer):
    # Сериализатор модели пользователя без поля Employee
    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber']


'''UserFIO'''
class UserFIOSerializer(ModelSerializer):
    # Сериализатор модели пользователя
    class Meta:
        model = User
        fields = ['fio']


'''UserRegistration'''
class UserRegistrationSerializer(serializers.ModelSerializer):
    # Сериализатор для регистрации пользователя
    fio = serializers.CharField()
    phoneNumber = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password', 'fio', 'phoneNumber']


'''EmployeeWithUserUP'''
class EmployeeWithUserUPSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера, password + username
    user = UserRegistrationSerializer(write_only=True)

    class Meta:
        model = Employee
        fields = '__all__'


'''EmployeeWithUser'''
class EmployeeWithUserSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


'''LegalEntity'''
class LegalEntitySerializer(ModelSerializer):
    # Сериализатор модели LegalEntity
    class Meta:
        model = LegalEntity
        fields = '__all__'


'''WorkObject'''
class WorkObjectSerializer(ModelSerializer):
    # Сериализатор модели WorkObject
    class Meta:
        model = WorkObject
        fields = '__all__'


'''WorkObjectsGroup'''
class WorkObjectsGroupSerializer(ModelSerializer):
    # Сериализатор модели WorkObjectsGroup
    workObjects = WorkObjectSerializer(read_only=True, many=True, required=False)

    class Meta:
        model = WorkObjectsGroup
        fields = '__all__'


class WorkObjectsGroupWithoutworkObjectsSerializer(ModelSerializer):
    # Сериализатор модели WorkObjectsGroup не расширенный
    class Meta:
        model = WorkObjectsGroup
        fields = '__all__'


'''WorkMaterial'''
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


'''ApplicationWorkTask'''
class ApplicationWorkTaskSerializer(ModelSerializer):
     # Сериализатор промежуточной таблицы с actualTime
    workTask = WorkTaskSerializer(read_only=True, many=False)

    class Meta:
        model = ApplicationWorkTask
        fields = ['actualTime', 'workTask']


'''ApplicationWorkMaterial'''
class ApplicationWorkMaterialSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы с actualCount
    workMaterial = WorkMaterialSerializer(read_only=True, many=False)

    class Meta:
        model = ApplicationWorkMaterial
        fields = ['actualCount', 'workMaterial']


'''Act'''
class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'created_at', 'file']


'''PaymentSlip'''
class PaymentSlipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'created_at', 'file']


'''Documents'''
class DocumentsSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


'''Extended Application'''
class ApplicationWithCreatorSerializer(ModelSerializer):
    # Сериализаатор для вывода списка заявок расширенный полями
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
    workTasks = ApplicationWorkTaskSerializer(source='applicationworktask_set', read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(source='applicationworkmaterial_set', read_only=True, many=True)
    # acts = ActSerializer(many=True, read_only=True, source='documents.filter(docType="act")')
    # payment_slips = PaymentSlipSerializer(many=True, read_only=True, source='documents.filter(docType="paymentSlip")')
    documents = DocumentsSerializer(many=True)

    acts = serializers.SerializerMethodField()
    paymentSlips = serializers.SerializerMethodField()
    other = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = '__all__'

    def get_acts(self, obj):
        acts_queryset = obj.documents.filter(docType='act')
        acts_serializer = ActSerializer(acts_queryset, many=True)
        return acts_serializer.data

    def get_paymentSlips(self, obj):
        payment_slips_queryset = obj.documents.filter(docType='paymentSlip')
        payment_slips_serializer = PaymentSlipSerializer(payment_slips_queryset, many=True)
        return payment_slips_serializer.data

    def get_other(self, obj):
        other_queryset = obj.documents.filter(docType='other')
        other_serializer = PaymentSlipSerializer(other_queryset, many=True)
        return other_serializer.data


'''Application'''
class ApplicationSerializer(ModelSerializer):
    # Сериализаатор для создания/удаления/обновления заявки
    workTasks = ApplicationWorkTaskSerializer(read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        many=False
        fields = '__all__'


'''Extended Client'''
class ClientWithCLWWSerializers(ModelSerializer):
    # Сериализатор для вывода списка клиентов с расширенным полем creator, legalEntity, workObject, workObjectsGroup
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
    legalEntity = LegalEntitySerializer(read_only=True, many=False)
    workObject = WorkObjectSerializer(read_only=True, many=False)
    workObjectsGroup = WorkObjectsGroupSerializer(read_only=True, many=True)

    class Meta:
        model = Client
        fields = '__all__'


'''Client'''
class ClientSerializers(ModelSerializer):
    # Сериализатор для создания/удаления/обновления клиента
    class Meta:
        model = Client
        many = False
        fields = '__all__'


'''WorkObjectsGroupWithWorkObject'''
class WorkObjectsGroupWithWorkObjectSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп рабочих объектов с расширенным полем workObjects
    workObjects = WorkObjectSerializer(read_only=True, many=True)

    class Meta:
        model = WorkObjectsGroup
        fields = '__all__'


'''WorkTaskGroupWithWorkTask'''
class WorkTaskGroupWithWorkTaskSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп услуг с расширенным полем workTask
    tasks = WorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = WorkTaskGroup
        fields = '__all__'


'''WorkTaskGroup'''
class WorkTaskGroupSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп услуг
    class Meta:
        model = WorkTaskGroup
        fields = '__all__'


'''WorkMaterialGroupWithWorkMaterial'''
class WorkMaterialGroupWithWorkMaterialSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп материалов с расширенным полем workMaterial
    materials = WorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = WorkMaterialGroup
        fields = '__all__'


'''WorkMaterialGroup'''
class WorkMaterialGroupSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп материалов
    class Meta:
        model = WorkMaterialGroup
        fields = '__all__'


'''UpdateWorkMaterial'''
class UpdateWorkMaterialSerializer(ModelSerializer):
    class Meta:
        model = ApplicationWorkMaterial
        fields = ['actualCount', 'workMaterial']

    def update(self, instance, validated_data):
        instance.actualCount = validated_data.get('actualCount', instance.actualCount)
        instance.workMaterial = validated_data.get('workMaterial', instance.workMaterial)
        instance.save()
        return instance


'''UpdateWorkTask'''
class UpdateWorkTaskSerializer(ModelSerializer):
    class Meta:
        model = ApplicationWorkTask
        fields = ['actualTime', 'workTask']

    def update(self, instance, validated_data):
        instance.actualTime = validated_data.get('actualTime', instance.actualTime)
        instance.workTask = validated_data.get('workTask', instance.workTask)
        instance.save()
        return instance


'''ApplicationWithWorkTasksWorkMaterialsUpdate'''
class ApplicationWithWorkTasksWorkMaterialsUpdateSerializer(ModelSerializer):
    # Сериализаатор для обновления заявок с расширенными полями workTasks, workMaterials
    workTasks = UpdateWorkTaskSerializer(source='applicationworktask_set', many=True)
    workMaterials = UpdateWorkMaterialSerializer(source='applicationworkmaterial_set', many=True)
    documents = DocumentsSerializer(many=True, required=False)

    class Meta:
        model = Application
        fields = ['workTasks', 'workMaterials', 'documents']

    def update(self, instance, validated_data):

        document_data = validated_data.get('documents')
        if document_data is not None:
            for document_item in document_data:
                document_id = document_item.get('id')
                if document_id:
                    document_instance = Document.objects.get(pk=document_id)
                    document_instance.docType = document_item.get('docType', document_instance.docType)
                    document_instance.name = document_item.get('name', document_instance.name)
                    document_instance.file = document_item.get('file', document_instance.file)
                    document_instance.save()
                else:
                    Document.objects.create(
                        docType=document_item.get('docType'),
                        name=document_item.get('name'),
                        file=document_item.get('file'),
                        application=instance,
                    )

        # Обработка обновления workTasks
        work_task_data = validated_data.get('applicationworktask_set')
        if work_task_data is not None:
            current_work_tasks = ApplicationWorkTask.objects.filter(application=instance)
            for current_work_task in current_work_tasks:
                if not any(item['workTask'] == current_work_task.workTask for item in work_task_data):
                    current_work_task.delete()
            for item in work_task_data:
                work_task_instance, created = ApplicationWorkTask.objects.get_or_create(
                    application=instance, workTask=item['workTask']
                )
                work_task_instance.actualTime = item['actualTime']
                work_task_instance.save()
        else:
            pass

        # Обработка обновления workMaterials
        work_material_data = validated_data.get('applicationworkmaterial_set')
        if work_material_data is not None:
            current_work_materials = ApplicationWorkMaterial.objects.filter(application=instance)
            for current_work_material in current_work_materials:
                if not any(item['workMaterial'] == current_work_material.workMaterial for item in work_material_data):
                    current_work_material.delete()
            for item in work_material_data:
                work_material_instance, created = ApplicationWorkMaterial.objects.get_or_create(
                    application=instance, workMaterial=item['workMaterial']
                )
                work_material_instance.actualCount = item['actualCount']
                work_material_instance.save()
        else:
            pass

        return instance


'''LegalEntityDetail'''
class LegalEntityDetailSerializer(ModelSerializer):
    # Сериализатор модели LegalEntity для DetailView
    workTaskGroups = WorkTaskGroupWithWorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = LegalEntity
        fields = '__all__'




'''SawatzkyEmployee'''
class SawatzkyEmployeeWithUserSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника Sawatzky с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'


class SawatzkyEmployeeSerializer(ModelSerializer):
    # Сериализатор для создания пользователя Sawatzky
    user = UserRegistrationSerializer(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'


class SawatzkyEmployeeWithWorkObjectSerializer(ModelSerializer):
    # Сериализатор для детейла с расширенными полями
    workingObjects = WorkObjectSerializer(read_only=True, many=True)
    workObject = WorkObjectSerializer(read_only=True, many=False)
    workObjectGroup = WorkObjectsGroupSerializer(read_only=True, many=False)
    fio = UserFIOSerializer(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'


class SawatzkyEmployeeWithoutworkingObjectsSerializer(ModelSerializer):
    # Сериализатор для вывода списка с расширенными полями
    workObject = WorkObjectSerializer(read_only=True, many=False)
    workObjectGroup = WorkObjectsGroupSerializer(read_only=True, many=False)
    fio = UserFIOSerializer(read_only=True)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'



