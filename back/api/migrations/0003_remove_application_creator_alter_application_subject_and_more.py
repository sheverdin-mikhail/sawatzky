# Generated by Django 4.1 on 2023-10-11 02:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_employee_options_alter_employee_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='creator',
        ),
        migrations.AlterField(
            model_name='application',
            name='subject',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='Предмет запроса'),
        ),
        migrations.AddField(
            model_name='application',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='application_creator', to='api.employee', verbose_name='Создатель заявки'),
        ),
    ]