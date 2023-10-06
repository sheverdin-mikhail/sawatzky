from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    """Общая модель пользователя"""
    fio = models.CharField(("ФИО"), max_length=255)
    phone_number = models.CharField(("Номер телефона"), max_length=20)



class LegalEntity(models.Model):
    """Юр. лицо"""
    name = models.CharField(("Наименование юридиеского лица"), max_length=100)
    head = models.CharField(("Руководитель"), max_length=100)
    legal_address = models.CharField(("Юридический адрес"), max_length=255)
    actual_address = models.CharField(("Фактический адрес"), max_length=255)
    phone = models.CharField(("Телефон"), max_length=20)
    mail = models.CharField(("E-mail"), max_length=30)
    INN = models.CharField(("ИНН/КПП"), max_length=50)
    settlement_account = models.CharField(("Расчётный счёт"), max_length=50)
    correspondent_account = models.CharField(("Корреспондентский счёт"), max_length=50)
    bank = models.CharField(("Банк"), max_length=50)
    bik = models.CharField(("БИК"), max_length=50)
    swatzki = models.BooleanField(("Относится к Swatzky"), default=False)
    

    class Meta:
        verbose_name = "Юр. Лицо"
        verbose_name_plural = "Юр. Лица"

    def __str__(self):
        return self.name

    

class CompanyMember(models.Model):
    """Работник компании SWATZKY"""

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

    user = models.OneToOneField(User, verbose_name=("Пользователь"), on_delete=models.CASCADE, related_name='performer')
    role = models.CharField(choices=ROLES, default='user', max_length=20, verbose_name='Роль пользователя')
    group = models.CharField(choices=GROUPS, default='S1', max_length=20, verbose_name='Группа пользователя')
    status = models.BooleanField(("Статус"), default=False)

    class Meta:
        verbose_name = "Сотрудник SWATZKY"
        verbose_name_plural = "Сотрудники SWATZKY"

    def __str__(self):
        return f"{self.user.id}: {self.user.fio}" 


class ClientMember(models.Model):
    """Сотрудник от контрагентов"""

    ROLES = (
        ('dispatcher', 'Диспетчер'),
        ('performer', 'Исполнитель'),
        ('dispatcher_performer', 'Диспетчер/Исполнитель'),
    )

    legal_entity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)
    user = models.OneToOneField(User, verbose_name=("Пользователь"), on_delete=models.CASCADE, related_name='client')
    role = models.CharField(choices=ROLES, default='dispatcher', max_length=20, verbose_name='Роль пользователя')

    class Meta:
        verbose_name = "Пользователь контрагента"
        verbose_name_plural = "Пользователи контрагента"

    def __str__(self):
        return f"{self.user.id}: {self.user.fio}" 
    
class WorkObjectsGroup(models.Model):
    """Группа рабочих объектов"""

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    work_objects = models.ManyToManyField("api.WorkObject", verbose_name=("Список объектов"), related_name='work_objects_group')
    

    class Meta:
        verbose_name = ("Группа объектов")
        verbose_name_plural = ("Группы объектов")

    def __str__(self):
        return self.name

class WorkObject(models.Model):
    """Рабочий объект"""

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    contract_number = models.CharField(("Номер договора"), max_length=50)
    address = models.CharField(("Адрес объекта"), max_length=255)

    class Meta:
        verbose_name = ("Рабочий объект")
        verbose_name_plural = ("Рабочие объекты")

    def __str__(self):
        return self.name



class Client(models.Model):
    """Заказчик/Контрагент"""

    legal_entity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)
    work_objects_group = models.ManyToManyField(WorkObjectsGroup, verbose_name=("Группы рабочих объектов"), related_name='client')
    work_object = models.ForeignKey(
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
        ("NEW", 'Создана'),
        ('PROCESSED', 'Обрабатывается'),
        ('COORDINATION', 'На согласовании у заказчика'),
        ('PAYMENT_COORDINATION', 'Ожидается оплата'),
        ('IN_WORK', 'Передано исполнителю'),
        ('FINISHED', 'Выполнено'),
    ]

    title = models.CharField(("Заголовок заявки"), max_length=50)
    subject = models.CharField(("Предмет запроса"), max_length=300)
    description = models.CharField(("Описание заявки"), max_length=300)
    creator = models.ManyToManyField("api.CompanyMember", verbose_name=("Создатель заявки"),  blank=True, null=True, related_name='application_creator')
    performer = models.ManyToManyField("api.CompanyMember", verbose_name=("Исполнители"),  blank=True, null=True, related_name='application_performer')
    work_tasks = models.ManyToManyField("api.WorkTask", verbose_name=("Проводимые работы"), blank=True, null=True, related_name='application')
    work_materials = models.ManyToManyField("api.WorkMaterial", verbose_name=("Материалы для работы"), blank=True, null=True, related_name='application')
    documents = models.ManyToManyField("api.Document", verbose_name=("Документы"), blank=True, null=True)

    total_summ = models.FloatField(("Общая стоимость работ"), blank=True, null=True)
    total_summ_with_percent = models.FloatField(("Общая стоимость работ с НДС"), blank=True, null=True)

    status = models.CharField(("Статус заявки"), max_length=50, choices=STATUSES, default='NEW')



    created_at = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updated_at = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)
    start_work_date = models.DateField(("Дата начала проведения работ"), auto_now=False, auto_now_add=False)
    end_work_date = models.DateField(("Дата окончания проведения работ"), auto_now=False, auto_now_add=False)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return self.title

    

class Report(models.Model):
    """Отчет"""
    

    client = models.ForeignKey(Client, verbose_name=("Заказчик в рамках которого создается отчет"), on_delete=models.CASCADE)
    company_member = models.ForeignKey(CompanyMember, verbose_name=("Сотрудник, создавший отчет"), on_delete=models.CASCADE)

    founded_apllications = models.ManyToManyField(Application, verbose_name=("Найденные заявки"), related_name='report')

    period_start = models.DateField(("Период поиска заявок от"), auto_now=False, auto_now_add=False)
    period_end = models.DateField(("Период поиска заявок до"), auto_now=False, auto_now_add=False)

    created_at = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updated_at = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = ("Отчет")
        verbose_name_plural = ("Отчеты")

    def __str__(self):
        return self.name
    


class Document(models.Model):
    """Документы"""
    

    name = models.CharField(("Наименование документа"), max_length=50)
    type = models.CharField(("Тип документа"), max_length=32)

    created_at = models.DateField(("Дата добавления документа"), auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = ("Документ")
        verbose_name_plural = ("Документы")

    def __str__(self):
        return self.name



   