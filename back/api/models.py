from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    pass


class LegalEntity(models.Model):

    name = models.CharField(("Наименование юридиеского лица"), max_length=100)

    class Meta:
        verbose_name = "Юр. Лицо"
        verbose_name_plural = "Юр. Лица"

    def __str__(self):
        return self.name

    

class CompanyMember(models.Model):

    user = models.OneToOneField(User, verbose_name=("Пользователь"), on_delete=models.CASCADE, related_name='performer')

    class Meta:
        verbose_name = "Исполнитель"
        verbose_name_plural = "Исполнители"

    def __str__(self):
        return f"{self.user.id}: {self.user.first_name} {self.user.last_name}" 
    
class WorkObjectsGroup(models.Model):

    name = models.CharField(("Наименование группы"), max_length=50)
    code = models.CharField(("Код объекта"), max_length=50)
    work_objects = models.ManyToManyField("app.Model", verbose_name=("Список объектов"), related_name='work_objects_group')
    

    class Meta:
        verbose_name = ("Группа объектов")
        verbose_name_plural = ("Группы объектов")

    def __str__(self):
        return self.name

class WorkObject(models.Model):

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

    legal_entity = models.ForeignKey(LegalEntity, verbose_name=("Юридическое лицо"), on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Закачик/Арендатор"
        verbose_name_plural = "Заказчики/Арендаторы"

    def __str__(self):
        return self.name

    
    
    





class Application(models.Model):

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

    

