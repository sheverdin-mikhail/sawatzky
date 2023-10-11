from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    """Общая модель пользователя"""
    fio = models.CharField(("ФИО"), max_length=255)
    phoneNumber = models.CharField(("Номер телефона"), max_length=20)



class LegalEntity(models.Model):
    """Юр. лицо"""
    name = models.CharField(("Наименование юридиеского лица"), max_length=100)
    head = models.CharField(("Руководитель"), max_length=100)
    legalAddress = models.CharField(("Юридический адрес"), max_length=255)
    actualAddress = models.CharField(("Фактический адрес"), max_length=255)
    phone = models.CharField(("Телефон"), max_length=20)
    mail = models.CharField(("E-mail"), max_length=30)
    INN = models.CharField(("ИНН/КПП"), max_length=50)
    settlementAccount = models.CharField(("Расчётный счёт"), max_length=50)
    correspondentAccount = models.CharField(("Корреспондентский счёт"), max_length=50)
    bank = models.CharField(("Банк"), max_length=50)
    bik = models.CharField(("БИК"), max_length=50)
    swatzki = models.BooleanField(("Относится к Swatzky"), default=False)
    

    class Meta:
        verbose_name = "Юр. Лицо"
        verbose_name_plural = "Юр. Лица"

    def __str__(self):
        return self.name

    

class Employee(models.Model):
    """Расширение модели пользователя"""

    ROLES = (
        ('dispatcher', 'Диспетчер'),
        ('performer', 'Исполнитель'),
        ('dispatcher_performer', 'Диспетчер/Исполнитель'),
    )

    GROUPS = (
        ('S1', 'Управляющий Объекта'),
        ('S2', 'Руководитель Отдела Управления'),
        ('S3', 'Исполнительный директор'),
        ('S4', 'Руководство'),
        ('S5', 'Администратор системы'),
        ('S6', 'Разработчик системы'),
    )

    legalEntity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)
    user = models.OneToOneField(User, verbose_name=("Пользователь"), on_delete=models.CASCADE, related_name='employee')
    role = models.CharField(choices=ROLES, default='user', max_length=20, verbose_name='Роль пользователя')
    group = models.CharField(choices=GROUPS, default='S1', max_length=20, verbose_name='Группа пользователя')
    status = models.BooleanField(("Статус"), default=False)

    class Meta:
        verbose_name = "Профиль пользователя"
        verbose_name_plural = "Профили пользователей"

    def __str__(self):
        return f"{self.user.id}: {self.user.fio}" 


    
class WorkObjectsGroup(models.Model):
    """Группа рабочих объектов"""

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    workObjects = models.ManyToManyField("api.WorkObject", verbose_name=("Список объектов"), related_name='work_objects_group')
    

    class Meta:
        verbose_name = ("Группа объектов")
        verbose_name_plural = ("Группы объектов")

    def __str__(self):
        return self.name
    

class WorkObject(models.Model):
    """Рабочий объект"""

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    contractNumber = models.CharField(("Номер договора"), max_length=50)
    address = models.CharField(("Адрес объекта"), max_length=255)

    class Meta:
        verbose_name = ("Рабочий объект")
        verbose_name_plural = ("Рабочие объекты")

    def __str__(self):
        return self.name



class Client(models.Model):
    """Заказчик/Контрагент"""

    legalEntity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)
    workObjectsGroup = models.ManyToManyField(WorkObjectsGroup, verbose_name=("Группы рабочих объектов"), related_name='client')
    workObject = models.ForeignKey(
        WorkObject,
        verbose_name=("Рабоий объект"), 
        on_delete=models.CASCADE, 
        related_name='client', 
        blank=True, 
        null=True
    )
    prepayment = models.BooleanField(("Работа по предоплате"), default=False)
    status = models.BooleanField(("Статус контрагента"), default=False)

    class Meta:
        verbose_name = "Закачик/Контрагент"
        verbose_name_plural = "Заказчики/Контрагент"

    def __str__(self):
        return f"{self.id}: { self.legal_entity } | {self.user.fio}"
    




class WorkTask(models.Model):
    """ Работы проводимые на объекте """

    name = models.CharField(("Наименование работы"), max_length=50)
    pirce = models.FloatField(("Цена"))
    time = models.IntegerField(("Ко/личество часов"))
    summ = models.FloatField(("Сумма"))


class WorkMaterial(models.Model):
    """ Рабочие материалы для проведения работ """

    name = models.CharField(("Наименование работы"), max_length=50)
    pirce = models.FloatField(("Цена"))
    count = models.IntegerField(("Количество штук"))
    summ = models.FloatField(("Сумма"))




class Application(models.Model):

    """Заявка на выполнение работ"""

    STATUSES = [
        ("new", 'Создана'),
        ('processed', 'Обрабатывается'),
        ('coordination', 'На согласовании у заказчика'),
        ('payment_coordination', 'Ожидается оплата'),
        ('in_work', 'Передано исполнителю'),
        ('finished', 'Выполнено'),
    ]

    title = models.CharField(("Заголовок заявки"), max_length=50)
    subject = models.CharField(("Предмет запроса"), max_length=300, blank=True, null=True)
    description = models.CharField(("Описание заявки"), max_length=300)
    creator = models.ForeignKey("api.Employee", verbose_name=("Создатель заявки"), on_delete=models.CASCADE, blank=True, null=True, related_name='applicationCreator')
    performer = models.ManyToManyField("api.Employee", verbose_name=("Исполнители"),  blank=True, null=True, related_name='applicationPerformer')
    workTasks = models.ManyToManyField("api.WorkTask", verbose_name=("Проводимые работы"), blank=True, null=True, related_name='application')
    workMaterials = models.ManyToManyField("api.WorkMaterial", verbose_name=("Материалы для работы"), blank=True, null=True, related_name='application')
    documents = models.ManyToManyField("api.Document", verbose_name=("Документы"), blank=True, null=True)

    totalSum = models.FloatField(("Общая стоимость работ"), blank=True, null=True)
    totalSumWithPercent = models.FloatField(("Общая стоимость работ с НДС"), blank=True, null=True)

    status = models.CharField(("Статус заявки"), max_length=50, blank=False, choices=STATUSES, default='new')

    createdAt = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updatedAt = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)
    startWorkDate = models.DateField(("Дата начала проведения работ"), auto_now=False, auto_now_add=False)
    endWorkDate = models.DateField(("Дата окончания проведения работ"), auto_now=False, auto_now_add=False)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return self.title

    

class Report(models.Model):
    """Отчет"""
    

    client = models.ForeignKey(Client, verbose_name=("Заказчик в рамках которого создается отчет"), on_delete=models.CASCADE)
    creator = models.ForeignKey(Employee, verbose_name=("Сотрудник, создавший отчет"), null=True, on_delete=models.CASCADE)

    foundedApllications = models.ManyToManyField(Application, verbose_name=("Найденные заявки"), related_name='report')

    periodStart = models.DateField(("Период поиска заявок от"), auto_now=False, auto_now_add=False)
    periodEnd = models.DateField(("Период поиска заявок до"), auto_now=False, auto_now_add=False)

    createdAt = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updatedAt = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = ("Отчет")
        verbose_name_plural = ("Отчеты")

    def __str__(self):
        return self.name
    


class Document(models.Model):
    """Документы"""
    

    name = models.CharField(("Наименование документа"), max_length=50)
    docType = models.CharField(("Тип документа"), max_length=32)

    created_at = models.DateField(("Дата добавления документа"), auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = ("Документ")
        verbose_name_plural = ("Документы")

    def __str__(self):
        return self.name



   