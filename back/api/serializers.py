from django.utils import timezone
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (
    User,
    Employee,
    Application,
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
    ApplicationPerformer,
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
    def get_employee(self, obj):
        try:
            employee = Employee.objects.get(user=obj)
            return EmployeeSerializer(employee).data
        except Employee.DoesNotExist:
            try:
                sawatzky_employee = SawatzkyEmployee.objects.get(user=obj)
                return SawatzkyEmployeeWithWorkObjectSerializer(sawatzky_employee).data
            except SawatzkyEmployee.DoesNotExist:
                return None

    class Meta:
        model = User
        fields = ['id', 'fio', 'phoneNumber']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        employee_data = self.get_employee(instance)
        if employee_data:
            if 'position' in employee_data:
                data['sawatzkyEmployee'] = employee_data
            else:
                data['employee'] = employee_data
        return data


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
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'fio', 'phoneNumber']


'''EmployeeWithUserUP'''
class EmployeeWithUserUPSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера, password + username
    user = UserRegistrationSerializer(write_only=True)

    class Meta:
        model = Employee
        fields = '__all__'


class EmployeeListSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера, password + username
    user = UserRegistrationSerializer(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'


'''WorkTask'''
class WorkTaskSerializer(ModelSerializer):
    # Сериализатор модели WorkTask
    class Meta:
        model = WorkTask
        fields = '__all__'


'''WorkTaskGroupWithWorkTask'''
class WorkTaskGroupWithWorkTaskSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп услуг с расширенным полем workTask
    tasks = WorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = WorkTaskGroup
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


'''WorkMaterialGroup'''
class WorkMaterialGroupSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп материалов
    class Meta:
        model = WorkMaterialGroup
        fields = '__all__'


'''LegalEntity'''
class LegalEntitySerializer(ModelSerializer):
    # Сериализатор модели LegalEntity
    class Meta:
        model = LegalEntity
        fields = ['id', 'name', 'head', 'legalAddress', 'actualAddress', 'phone',
                  'mail', 'INN', 'settlementAccount', 'correspondentAccount',
                  'bank', 'bik', 'sawatzky', 'status', 'workObject', 'workObjectsGroup']


class ClientLESerializer(ModelSerializer):
    # Сериализатор модели LegalEntity
    class Meta:
        model = LegalEntity
        fields = ['id', 'workTaskGroups', 'workMaterialGroups', 'workObject',
                  'workObjectsGroup', 'prepayment', 'sawatzky', 'status']


class LegalEntityOrClientLESerializer(ModelSerializer):

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)
        if 'context' in kwargs and 'request' in kwargs['context']:
            sawatzky_value = kwargs['context']['request'].data.get('sawatzky')

            if sawatzky_value:
                true_required_fields = [
                    'name', 'head', 'legalAddress', 'actualAddress', 'phone', 'mail', 'INN',
                    'settlementAccount', 'correspondentAccount', 'bank', 'bik', 'workObjectsGroup',
                    'workObject'
                ]
                for field_name in true_required_fields:
                    self.fields[field_name].required = True

            if sawatzky_value is not None and not sawatzky_value:
                non_required_fields = [
                    'name', 'head', 'legalAddress', 'actualAddress', 'phone', 'mail', 'INN',
                    'settlementAccount', 'correspondentAccount', 'bank', 'bik',
                ]
                for field_name in non_required_fields:
                    self.fields[field_name].required = False

            if sawatzky_value is not None and not sawatzky_value:
                required_fields = [
                    'workObjectsGroup', 'workObject', 'workTaskGroups',
                    'workMaterialGroups', 'prepayment', 'sawatzky', 'status'
                ]
                for field_name in required_fields:
                    self.fields[field_name].required = True
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['workObject'] = instance.workObject.id if instance.workObject else None
        representation['workObjectsGroup'] = instance.workObjectsGroup.id if instance.workObjectsGroup else None

        if instance.sawatzky:
            return LegalEntitySerializer(instance, context=self.context).data
        else:
            return ClientLESerializer(instance, context=self.context).data

    class Meta:
        model = LegalEntity
        fields = '__all__'


class LegalEntityDetailSerializer(ModelSerializer):
    # Сериализатор модели LegalEntity для DetailView
    workTaskGroups = WorkTaskGroupWithWorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = LegalEntity
        fields = '__all__'


class LegalEntityListSerializer(ModelSerializer):
    # Сериализатор модели LegalEntity для DetailView
    workTaskGroups = WorkTaskGroupWithWorkTaskSerializer(read_only=True, many=True)
    workMaterialGroups = WorkMaterialGroupSerializer(read_only=True, many=True)
    workObjectsGroup = WorkObjectsGroupSerializer(read_only=True, many=False)
    workObject = WorkObjectSerializer(read_only=True, many=False)

    class Meta:
        model = LegalEntity
        fields = '__all__'


class EmployeeDetailSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера, password + username
    user = UserRegistrationSerializer(write_only=True)
    legalEntity = LegalEntitySerializer(read_only=True, many=False)
    class Meta:
        model = Employee
        fields = '__all__'


'''WorkMaterial'''
class WorkMaterialSerializer(ModelSerializer):
    # Сериализатор модели WorkMaterial
    class Meta:
        model = WorkMaterial
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


class SawatzkyEmployeeSerializer(ModelSerializer):
    # Сериализатор для создания пользователя Sawatzky
    user = UserRegistrationSerializer(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'
        

'''ApplicationPerformer'''
class ApplicationPerformerSerializer(ModelSerializer):
    # Сериализатор промежуточной таблицы ApplicationPerformer для добавления исполнителя к заявке
    performer = SawatzkyEmployeeSerializer(read_only=True, many=False)

    class Meta:
        model = ApplicationPerformer
        fields = ['performer', 'priority', 'status', 'dateSent', 'dateAccepted', 'dateDeclined']

    def save(self, *args, **kwargs):
        if self.validated_data.get('status') == 'accepted' and not self.instance.dateAccepted:
            self.instance.dateAccepted = timezone.now()
        elif self.validated_data.get('status') == 'declined' and not self.instance.dateDeclined:
            self.instance.dateDeclined = timezone.now()

        super().save(*args, **kwargs)

'''Act'''
class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'createdAt', 'file']


'''PaymentSlip'''
class PaymentSlipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'createdAt', 'file']


'''Documents'''
class DocumentsSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


'''EmployeeWithUser'''
class EmployeeWithUserSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)
    legalEntity = LegalEntityDetailSerializer(read_only=True, many=False)

    class Meta:
        model = Employee
        fields = '__all__'


'''Extended Application'''
class ApplicationWithCreatorSerializer(ModelSerializer):
    # Сериализаатор для вывода списка заявок расширенный полями
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
    workTasks = ApplicationWorkTaskSerializer(source='applicationworktask_set', read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(source='applicationworkmaterial_set', read_only=True, many=True)
    performers = ApplicationPerformerSerializer(source='applicationperformer_set', read_only=True, many=True)
    documents = DocumentsSerializer(many=True)

    acts = serializers.SerializerMethodField()
    paymentSlips = serializers.SerializerMethodField()
    other = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = '__all__'

    def get_acts(self, obj):
        acts_queryset = obj.documents.filter(docType='act').order_by('-createdAt')
        acts_serializer = ActSerializer(acts_queryset, many=True)
        return acts_serializer.data

    def get_paymentSlips(self, obj):
        payment_slips_queryset = obj.documents.filter(docType='paymentSlip').order_by('-createdAt')
        payment_slips_serializer = PaymentSlipSerializer(payment_slips_queryset, many=True)
        return payment_slips_serializer.data

    def get_other(self, obj):
        other_queryset = obj.documents.filter(docType='other').order_by('-createdAt')
        other_serializer = PaymentSlipSerializer(other_queryset, many=True)
        return other_serializer.data

    def to_representation(self, instance):
        sorted_documents = instance.documents.order_by('-createdAt')
        sorted_documents_data = DocumentsSerializer(sorted_documents, many=True).data

        representation = super().to_representation(instance)
        representation['documents'] = sorted_documents_data

        return representation


'''Application'''
class ApplicationSerializer(ModelSerializer):
    # Сериализаатор для создания/удаления/обновления заявки
    workTasks = ApplicationWorkTaskSerializer(read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        many=False
        fields = '__all__'


'''WorkObjectsGroupWithWorkObject'''
class WorkObjectsGroupWithWorkObjectSerializer(ModelSerializer):
    # Сериализатор для вывода списка групп рабочих объектов с расширенным полем workObjects
    workObjects = WorkObjectSerializer(read_only=True, many=True)

    class Meta:
        model = WorkObjectsGroup
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


'''UpdateEmployee'''
class UpdatePerformerSerializer(ModelSerializer):
    class Meta:
        model = ApplicationPerformer
        fields = ['performer', 'priority', 'status']

    def update(self, instance, validated_data):
        print("Update method is called!")
        instance.performer = validated_data.get('performer', instance.performer)
        instance.priority = validated_data.get('priority', instance.performer)
        instance.save()
        return instance


'''ApplicationWithWorkTasksWorkMaterialsUpdate'''
class ApplicationWithWorkTasksWorkMaterialsUpdateSerializer(ModelSerializer):
    # Сериализаатор для обновления заявок с расширенными полями workTasks, workMaterials
    workTasks = UpdateWorkTaskSerializer(source='applicationworktask_set', many=True)
    workMaterials = UpdateWorkMaterialSerializer(source='applicationworkmaterial_set', many=True)
    performers = UpdatePerformerSerializer(source='applicationperformer_set', many=True)

    class Meta:
        model = Application
        fields = ['workTasks', 'workMaterials', 'step', 'status', 'performers']

    def update(self, instance, validated_data):

        # Обработка обновления Employee
        performers_data = validated_data.pop('applicationperformer_set', None)
        if performers_data is not None:
            current_performers = ApplicationPerformer.objects.filter(application=instance)
            for current_performer in current_performers:
                if not any(item['performer'] == current_performer.performer for item in performers_data):
                    current_performer.delete()
            for performer_data in performers_data:
                performer_instance, created = ApplicationPerformer.objects.get_or_create(
                    application=instance,
                    performer=performer_data['performer']
                )
                performer_instance.priority = performer_data.get('priority', performer_instance.priority)
                performer_instance.status = performer_data.get('status', performer_instance.status)

                if performer_instance.status == 'accepted' and not performer_instance.dateAccepted:
                    performer_instance.dateAccepted = timezone.now()
                elif performer_instance.status == 'declined' and not performer_instance.dateDeclined:
                    performer_instance.dateDeclined = timezone.now()
                performer_instance.save()

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

        step = validated_data.get('step')
        if step is not None:
            instance.step = step
            if(step == 1):
                instance.status = 'processed'
            if(step == 2):
                instance.status = 'coordination'
            if(step == 3):
                instance.status = 'paymentCoordination'
            if(step == 4):
                instance.status = 'inWork'
            if(step == 5):
                instance.status = 'coordination'
            if(step == 6):
                instance.status = 'waitingFinish'
            if(step == 7):
                instance.status = 'finished'
            
        status = validated_data.get('status')
        if status is not None:
            instance.status = status

        instance.save()

        return instance


'''SawatzkyEmployee'''
class SawatzkyEmployeeWithUserSerializer(serializers.ModelSerializer):
    # Сериализатор для сотрудника Sawatzky с расширенным полем юзера
    user = UserSerializerWithoutEmployee(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'



class SawatzkyEmployeeWithWorkObjectSerializer(ModelSerializer):
    # Сериализатор для детейла с расширенными полями
    # workingObjects = WorkObjectSerializer(read_only=True, many=True)
    # workObject = WorkObjectSerializer(read_only=True, many=False)
    # workObjectGroup = WorkObjectsGroupSerializer(read_only=True, many=False)
    fio = UserFIOSerializer(read_only=True, many=False)

    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'


class SawatzkyEmployeeWithoutworkingObjectsSerializer(ModelSerializer):
    # Сериализатор для вывода списка с расширенными полями
    workObject = WorkObjectSerializer(read_only=True, many=False)
    workObjectGroup = WorkObjectsGroupSerializer(read_only=True, many=False)
    user = UserSerializerWithoutEmployee(read_only=True, many=False)


    class Meta:
        model = SawatzkyEmployee
        fields = '__all__'



