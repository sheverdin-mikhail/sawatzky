# Generated by Django 4.1 on 2023-11-27 12:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_alter_document_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='legalentity',
            name='workTaskGroups',
        ),
        migrations.AddField(
            model_name='client',
            name='workMaterialGroups',
            field=models.ManyToManyField(blank=True, null=True, to='api.workmaterialgroup', verbose_name='Предоставляемые группы материалов'),
        ),
        migrations.AddField(
            model_name='client',
            name='workTaskGroups',
            field=models.ManyToManyField(blank=True, null=True, to='api.worktaskgroup', verbose_name='Предоставляемые группы услуг'),
        ),
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('new', 'Создана'), ('processed', 'Обрабатывается'), ('coordination', 'На согласовании у заказчика'), ('paymentCoordination', 'Ожидается оплата'), ('inWork', 'Передано исполнителю'), ('finished', 'Выполнено')], default='new', max_length=50, verbose_name='Статус заявки'),
        ),
        migrations.AlterField(
            model_name='document',
            name='docType',
            field=models.CharField(choices=[('act', 'Акт'), ('powerOfAttorney', 'Доверенность'), ('paymentSlip', 'Платежка'), ('other', 'Прочее')], max_length=32, verbose_name='Тип документа'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='role',
            field=models.CharField(choices=[('dispatcher', 'Диспетчер'), ('performer', 'Исполнитель'), ('dispatcherPerformer', 'Диспетчер/Исполнитель')], default='user', max_length=20, verbose_name='Роль пользователя'),
        ),
        migrations.CreateModel(
            name='SawatzkyEmployee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=100, verbose_name='Должность')),
                ('status', models.BooleanField(default=False, verbose_name='Статус')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sawatzky_employee', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
                ('workObject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.workobject', verbose_name='Рабочий объект')),
                ('workObjectGroup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.workobjectsgroup', verbose_name='Группа рабочих объектов')),
                ('workingObjects', models.ManyToManyField(related_name='sawatzky_employees', to='api.workobject', verbose_name='Обслуживаемые объекты')),
            ],
            options={
                'verbose_name': 'Сотрудник Sawatzky',
                'verbose_name_plural': 'Сотрудники Sawatzky',
            },
        ),
    ]
