# Generated by Django 4.1 on 2023-12-28 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_alter_application_performers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('new', 'Создана'), ('processed', 'Обрабатывается'), ('coordination', 'На согласовании у заказчика'), ('paymentCoordination', 'Ожидается оплата'), ('inWork', 'Передано исполнителю'), ('waitingFinish', 'Ожидает подтверждения завершения'), ('finished', 'Выполнено')], default='new', max_length=50, verbose_name='Статус заявки'),
        ),
        migrations.AlterField(
            model_name='workobjectsgroup',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Наименование группы'),
        ),
        migrations.AlterField(
            model_name='worktaskgroup',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Наименование группы услуг'),
        ),
    ]
