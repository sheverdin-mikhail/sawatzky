from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    """Общая модель пользователя"""
    fio = models.CharField(("ФИО"), max_length=255)
    phone_number = models.CharField(("Номер телефона"), max_length=20)



class LegalEntity(models.Model):
    """Юр. лицо"""
    name = models.CharField(("Наименование юридиеского лица"), max_length=100)

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

    class Meta:
        verbose_name = "Сотрудник SWATZKY"
        verbose_name_plural = "Сотрудники SWATZKY"

    def __str__(self):
        return f"{self.user.id}: {self.user.fio}" 
    
class WorkObjectsGroup(models.Model):
    """Группа рабочих объектов"""

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    work_objects = models.ManyToManyField("app.Model", verbose_name=("Список объектов"), related_name='work_objects_group')
    

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
    legal_entity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)
    address = models.CharField(("Адрес объекта"), max_length=255)

    class Meta:
        verbose_name = ("Рабочий объект")
        verbose_name_plural = ("Рабочие объекты")

    def __str__(self):
        return self.name



class Client(models.Model):
    """Заказчик"""

    user = models.OneToOneField(User, verbose_name=("Пользователь"), on_delete=models.CASCADE)
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

    class Meta:
        verbose_name = "Закачик/Арендатор"
        verbose_name_plural = "Заказчики/Арендаторы"

    def __str__(self):
        return f"{self.id}: { self.legal_entity } | {self.user.fio}"

    
    

class Application(models.Model):

    """Заявка на работу"""

    title = models.CharField(("Заголовок заявки"), max_length=50)
    subject = models.CharField(("Предмет запроса"), max_length=300)
    description = models.CharField(("Описание заявки"), max_length=300)
    performer = models.ForeignKey("app.Model", verbose_name=("Исполнитель"), on_delete=models.CASCADE)

    created_at = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updated_at = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)
    start_work_date = models.DateField(("Дата начала проведения работ"), auto_now=False, auto_now_add=False)
    end_work_date = models.DateField(("Дата окончания проведения работ"), auto_now=False, auto_now_add=False)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return self.name

    

class Report(models.Model):
    """Отчет"""
    

    client = models.ForeignKey(Client, verbose_name=("Заказчик в рамках которого создается отчет"), on_delete=models.CASCADE)
    company_member = models.ForeignKey(CompanyMember, verbose_name=("Сотрудник, создавший отчет"), on_delete=models.CASCADE)

    founded_apllications = models.ManyToManyField(Application, verbose_name=("Найденные заявки"))

    period_start = models.DateField(("Период поиска заявок от"), auto_now=False, auto_now_add=False)
    period_end = models.DateField(("Период поиска заявок до"), auto_now=False, auto_now_add=False)

    created_at = models.DateField(("Дата создания заявки"), auto_now=False, auto_now_add=True)
    updated_at = models.DateField(("Последняя дата изменения"), auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = ("Отчет")
        verbose_name_plural = ("Отчеты")

    def __str__(self):
        return self.name

   