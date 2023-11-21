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
)



class EmployeeSerializer(ModelSerializer):
    # Сериализатор модели расширяющей профиль пользователя
    class Meta:
        model = Employee
        fields = '__all__'


class LegalEntitySerializer(ModelSerializer):
    # Сериализатор модели LegalEntity
    class Meta:
        model = LegalEntity
        fields = '__all__'


class WorkObjectSerializer(ModelSerializer):
    # Сериализатор модели WorkObject
    class Meta:
        model = WorkObject
        fields = '__all__'


class WorkObjectsGroupSerializer(ModelSerializer):
    # Сериализатор модели WorkObjectsGroup
    workObjects = WorkObjectSerializer(read_only=True, many=True, required=False)

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


class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'created_at', 'file']


class PaymentSlipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'created_at', 'file']


class ApplicationWithCreatorSerializer(ModelSerializer):
    # Сериализаатор для вывода списка заявок с расширенным полем creator
    creator = EmployeeWithUserSerializer(read_only=True, many=False)
    workTasks = ApplicationWorkTaskSerializer(source='applicationworktask_set', read_only=True, many=True)
    workMaterials = ApplicationWorkMaterialSerializer(source='applicationworkmaterial_set', read_only=True, many=True)
    acts = ActSerializer(many=True, read_only=True, source='documents.filter(docType="Act")')
    payment_slips = PaymentSlipSerializer(many=True, read_only=True, source='documents.filter(docType="Payment_slip")')

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


class UpdateWorkMaterialSerializer(ModelSerializer):
    class Meta:
        model = ApplicationWorkMaterial
        fields = ['actualCount', 'workMaterial']

    def update(self, instance, validated_data):
        instance.actualCount = validated_data.get('actualCount', instance.actualCount)
        instance.workMaterial = validated_data.get('workMaterial', instance.workMaterial)
        instance.save()
        return instance


class UpdateWorkTaskSerializer(ModelSerializer):
    
    class Meta:
        model = ApplicationWorkTask
        fields = ['actualTime', 'workTask']

    def update(self, instance, validated_data):
        instance.actualTime = validated_data.get('actualTime', instance.actualTime)
        instance.workTask = validated_data.get('workTask', instance.workTask)
        instance.save()
        return instance


class UpdateDocumentSerializer(ModelSerializer):

    class Meta:
        model = Document
        fields = ['docType', 'name', 'file', ]

    def update(self, instance, validated_data):
        instance.docType = validated_data.get('docType', instance.docType)
        instance.name = validated_data.get('name', instance.name)
        file = validated_data.get('file')
        if file is not None:
            instance.file = file
        instance.save()
        return instance


class ApplicationWithWorkTasksWorkMaterialsUpdateSerializer(ModelSerializer):
    # Сериализаатор для обновления заявок с расширенными полями workTasks, workMaterials
    workTasks = UpdateWorkTaskSerializer(source='applicationworktask_set', many=True)
    workMaterials = UpdateWorkMaterialSerializer(source='applicationworkmaterial_set', many=True)
    documents = UpdateDocumentSerializer(many=True)

    class Meta:
        model = Application
        fields = ['workTasks', 'workMaterials', 'documents']

    def update(self, instance, validated_data):

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
                # Если work_task_data пуст, удаляем все связанные workTasks
                instance.applicationworktask_set.all().delete()

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
                # Если work_material_data пуст, удаляем все связанные workMaterials
                instance.applicationworkmaterial_set.all().delete()

            # Обработка обновления documents
            document_data = validated_data.get('documents')
            if document_data is not None:
                current_documents = Document.objects.filter(application=instance)
                for current_document in current_documents:
                    if not any(item['documents'] == current_document.documents for item in document_data):
                        current_document.delete()
                for item in document_data:
                    document_instance, created = Document.objects.get_or_create(
                        application=instance, documents=item['documents']
                    )
                    document_instance.docType = item['docType']
                    document_instance.name = item['name']
                    file = item['file']
                    if file is not None:
                        document_instance.file = file
                    document_instance.save()
            else:
                # Если document_data пуст, удаляем все связанные документы
                instance.documents.all().delete()

            return instance

    # def update(self, instance, validated_data):
    #
    #     # Обработка обновления workTasks
    #     work_task_data = validated_data.get('applicationworktask_set')
    #     print(validated_data)
    #     if work_task_data:
    #
    #         current_work_tasks = ApplicationWorkTask.objects.filter(application=instance)
    #         # Удаляем workTasks, которых нет в validated_data
    #         for current_work_task in current_work_tasks:
    #             if not any(item['workTask'] == current_work_task.workTask for item in work_task_data):
    #                 current_work_task.delete()
    #
    #         # Создаем/Обновляем actualTime для workTask
    #         for item in work_task_data:
    #             work_task_instance, created = ApplicationWorkTask.objects.get_or_create(
    #                 application=instance, workTask=item['workTask']
    #             )
    #             work_task_instance.actualTime = item['actualTime']
    #             work_task_instance.save()
    #
    #
    #
    #     # Обработка обновления workMaterials
    #     work_material_data = validated_data.get('applicationworkmaterial_set')
    #     if work_material_data:
    #
    #         current_work_materials = ApplicationWorkMaterial.objects.filter(application=instance)
    #         # Удаляем workMaterials, которых нет в validated_data
    #         for current_work_material in current_work_materials:
    #             if not any(item['workMaterial'] == current_work_material.workMaterial for item in work_material_data):
    #                 current_work_material.delete()
    #
    #         # Создаем/Обновляем actualMaterial для workMaterial
    #         for item in work_material_data:
    #             work_material_instance, created = ApplicationWorkMaterial.objects.get_or_create(
    #                 application=instance, workMaterial=item['workMaterial']
    #             )
    #             work_material_instance.actualCount = item['actualCount']
    #             work_material_instance.save()
    #
    #     return instance

class LegalEntityDetailSerializer(ModelSerializer):
    # Сериализатор модели LegalEntity для DetailView
    workTaskGroups = WorkTaskGroupWithWorkTaskSerializer(read_only=True, many=True)

    class Meta:
        model = LegalEntity
        fields = '__all__'
