# Generated by Django 4.1 on 2023-10-06 17:23

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('fio', models.CharField(max_length=255, verbose_name='ФИО')),
                ('phone_number', models.CharField(max_length=20, verbose_name='Номер телефона')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Заголовок заявки')),
                ('subject', models.CharField(max_length=300, verbose_name='Предмет запроса')),
                ('description', models.CharField(max_length=300, verbose_name='Описание заявки')),
                ('total_summ', models.FloatField(blank=True, null=True, verbose_name='Общая стоимость работ')),
                ('total_summ_with_percent', models.FloatField(blank=True, null=True, verbose_name='Общая стоимость работ с НДС')),
                ('status', models.CharField(choices=[('NEW', 'Создана'), ('PROCESSED', 'Обрабатывается'), ('COORDINATION', 'На согласовании у заказчика'), ('PAYMENT_COORDINATION', 'Ожидается оплата'), ('IN_WORK', 'Передано исполнителю'), ('FINISHED', 'Выполнено')], default='NEW', max_length=50, verbose_name='Статус заявки')),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='Дата создания заявки')),
                ('updated_at', models.DateField(auto_now=True, verbose_name='Последняя дата изменения')),
                ('start_work_date', models.DateField(verbose_name='Дата начала проведения работ')),
                ('end_work_date', models.DateField(verbose_name='Дата окончания проведения работ')),
            ],
            options={
                'verbose_name': 'Заявка',
                'verbose_name_plural': 'Заявки',
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prepayment', models.BooleanField(default=False, verbose_name='Работа по предоплате')),
                ('status', models.BooleanField(default=False, verbose_name='Статус контрагента')),
            ],
            options={
                'verbose_name': 'Закачик/Контрагент',
                'verbose_name_plural': 'Заказчики/Контрагент',
            },
        ),
        migrations.CreateModel(
            name='CompanyMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('dispatcher', 'Диспетчер'), ('performer', 'Исполнитель'), ('dispatcher_performer', 'Диспетчер/Исполнитель')], default='user', max_length=20, verbose_name='Роль пользователя')),
                ('group', models.CharField(choices=[('S1', 'Управляющий Объекта'), ('S2', 'Руководитель Отдела Управления'), ('S3', 'Исполнительный директор'), ('S4', 'Руководство'), ('S5', 'Администратор системы'), ('S6', 'Разработчик системы')], default='S1', max_length=20, verbose_name='Группа пользователя')),
                ('status', models.BooleanField(default=False, verbose_name='Статус')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='performer', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Сотрудник SWATZKY',
                'verbose_name_plural': 'Сотрудники SWATZKY',
            },
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование документа')),
                ('type', models.CharField(max_length=32, verbose_name='Тип документа')),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='Дата добавления документа')),
            ],
            options={
                'verbose_name': 'Документ',
                'verbose_name_plural': 'Документы',
            },
        ),
        migrations.CreateModel(
            name='LegalEntity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование юридиеского лица')),
                ('head', models.CharField(max_length=100, verbose_name='Руководитель')),
                ('legal_address', models.CharField(max_length=255, verbose_name='Юридический адрес')),
                ('actual_address', models.CharField(max_length=255, verbose_name='Фактический адрес')),
                ('phone', models.CharField(max_length=20, verbose_name='Телефон')),
                ('mail', models.CharField(max_length=30, verbose_name='E-mail')),
                ('INN', models.CharField(max_length=50, verbose_name='ИНН/КПП')),
                ('settlement_account', models.CharField(max_length=50, verbose_name='Расчётный счёт')),
                ('correspondent_account', models.CharField(max_length=50, verbose_name='Корреспондентский счёт')),
                ('bank', models.CharField(max_length=50, verbose_name='Банк')),
                ('bik', models.CharField(max_length=50, verbose_name='БИК')),
                ('swatzki', models.BooleanField(default=False, verbose_name='Относится к Swatzky')),
            ],
            options={
                'verbose_name': 'Юр. Лицо',
                'verbose_name_plural': 'Юр. Лица',
            },
        ),
        migrations.CreateModel(
            name='WorkMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование работы')),
                ('pirce', models.FloatField(verbose_name='Цена')),
                ('count', models.IntegerField(verbose_name='Количество штук')),
                ('summ', models.FloatField(verbose_name='Сумма')),
            ],
        ),
        migrations.CreateModel(
            name='WorkObject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование группы')),
                ('code', models.CharField(max_length=50, verbose_name='Код объекта')),
                ('contract_number', models.CharField(max_length=50, verbose_name='Номер договора')),
                ('address', models.CharField(max_length=255, verbose_name='Адрес объекта')),
            ],
            options={
                'verbose_name': 'Рабочий объект',
                'verbose_name_plural': 'Рабочие объекты',
            },
        ),
        migrations.CreateModel(
            name='WorkTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование работы')),
                ('pirce', models.FloatField(verbose_name='Цена')),
                ('time', models.IntegerField(verbose_name='Ко/личество часов')),
                ('summ', models.FloatField(verbose_name='Сумма')),
            ],
        ),
        migrations.CreateModel(
            name='WorkObjectsGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Наименование группы')),
                ('code', models.CharField(max_length=50, verbose_name='Код объекта')),
                ('work_objects', models.ManyToManyField(related_name='work_objects_group', to='api.workobject', verbose_name='Список объектов')),
            ],
            options={
                'verbose_name': 'Группа объектов',
                'verbose_name_plural': 'Группы объектов',
            },
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('period_start', models.DateField(verbose_name='Период поиска заявок от')),
                ('period_end', models.DateField(verbose_name='Период поиска заявок до')),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='Дата создания заявки')),
                ('updated_at', models.DateField(auto_now=True, verbose_name='Последняя дата изменения')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.client', verbose_name='Заказчик в рамках которого создается отчет')),
                ('company_member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.companymember', verbose_name='Сотрудник, создавший отчет')),
                ('founded_apllications', models.ManyToManyField(related_name='report', to='api.application', verbose_name='Найденные заявки')),
            ],
            options={
                'verbose_name': 'Отчет',
                'verbose_name_plural': 'Отчеты',
            },
        ),
        migrations.CreateModel(
            name='ClientMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('dispatcher', 'Диспетчер'), ('performer', 'Исполнитель'), ('dispatcher_performer', 'Диспетчер/Исполнитель')], default='dispatcher', max_length=20, verbose_name='Роль пользователя')),
                ('legal_entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.legalentity', verbose_name='Юридическое лицо')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='client', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Пользователь контрагента',
                'verbose_name_plural': 'Пользователи контрагента',
            },
        ),
        migrations.AddField(
            model_name='client',
            name='legal_entity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.legalentity', verbose_name='Юридическое лицо'),
        ),
        migrations.AddField(
            model_name='client',
            name='work_object',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client', to='api.workobject', verbose_name='Рабоий объект'),
        ),
        migrations.AddField(
            model_name='client',
            name='work_objects_group',
            field=models.ManyToManyField(related_name='client', to='api.workobjectsgroup', verbose_name='Группы рабочих объектов'),
        ),
        migrations.AddField(
            model_name='application',
            name='creator',
            field=models.ManyToManyField(blank=True, null=True, related_name='application_creator', to='api.companymember', verbose_name='Создатель заявки'),
        ),
        migrations.AddField(
            model_name='application',
            name='documents',
            field=models.ManyToManyField(blank=True, null=True, to='api.document', verbose_name='Документы'),
        ),
        migrations.AddField(
            model_name='application',
            name='performer',
            field=models.ManyToManyField(blank=True, null=True, related_name='application_performer', to='api.companymember', verbose_name='Исполнители'),
        ),
        migrations.AddField(
            model_name='application',
            name='work_materials',
            field=models.ManyToManyField(blank=True, null=True, related_name='application', to='api.workmaterial', verbose_name='Материалы для работы'),
        ),
        migrations.AddField(
            model_name='application',
            name='work_tasks',
            field=models.ManyToManyField(blank=True, null=True, related_name='application', to='api.worktask', verbose_name='Проводимые работы'),
        ),
    ]