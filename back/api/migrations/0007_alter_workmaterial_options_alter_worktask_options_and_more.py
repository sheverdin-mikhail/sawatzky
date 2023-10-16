# Generated by Django 4.1 on 2023-10-16 09:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_legal_entity_client_legalentity_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='workmaterial',
            options={'verbose_name': 'Рабочий материал', 'verbose_name_plural': 'Рабочие материалы'},
        ),
        migrations.AlterModelOptions(
            name='worktask',
            options={'verbose_name': 'Проводимая работа', 'verbose_name_plural': 'Проводимые работы'},
        ),
        migrations.AddField(
            model_name='application',
            name='step',
            field=models.PositiveIntegerField(default=1, verbose_name='Шаг выполнения заявки'),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='avatars', verbose_name='Аватар пользователя'),
        ),
        migrations.AddField(
            model_name='workmaterial',
            name='actualCount',
            field=models.IntegerField(blank=True, null=True, verbose_name='Актуальное количество материала для выполнения работ'),
        ),
        migrations.AddField(
            model_name='workmaterial',
            name='status',
            field=models.BooleanField(default=False, verbose_name='Статус материала'),
        ),
        migrations.AddField(
            model_name='worktask',
            name='actualTime',
            field=models.IntegerField(blank=True, null=True, verbose_name='Актуальный срок выполнения работ'),
        ),
        migrations.AddField(
            model_name='worktask',
            name='status',
            field=models.BooleanField(default=False, verbose_name='Статус услуги'),
        ),
        migrations.AlterField(
            model_name='client',
            name='workObject',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client', to='api.workobject', verbose_name='Рабочий объект'),
        ),
        migrations.AlterField(
            model_name='workmaterial',
            name='count',
            field=models.IntegerField(verbose_name='Рекомендованное количество материала для выполнения работ'),
        ),
        migrations.AlterField(
            model_name='worktask',
            name='time',
            field=models.IntegerField(verbose_name='Рекомендованный срок выполнения работ'),
        ),
        migrations.CreateModel(
            name='WorkTaskGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование группы услуг')),
                ('tasks', models.ManyToManyField(to='api.worktask', verbose_name='Список услуг входящих в эту группу')),
            ],
            options={
                'verbose_name': 'Группа услуг',
                'verbose_name_plural': 'Группы услуг',
            },
        ),
        migrations.CreateModel(
            name='WorkMaterialGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование группы материалов')),
                ('tasks', models.ManyToManyField(to='api.workmaterial', verbose_name='Список материалов входящих в эту группу')),
            ],
            options={
                'verbose_name': 'Группа материалов',
                'verbose_name_plural': 'Группы материалов',
            },
        ),
    ]
