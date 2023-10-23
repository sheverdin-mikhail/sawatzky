# Generated by Django 4.1 on 2023-10-23 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_application_place'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='workMaterials',
            field=models.ManyToManyField(blank=True, null=True, related_name='applications', through='api.ApplicationWorkMaterial', to='api.workmaterial', verbose_name='Материалы для работы'),
        ),
        migrations.AlterField(
            model_name='application',
            name='workTasks',
            field=models.ManyToManyField(blank=True, null=True, related_name='applications', through='api.ApplicationWorkTask', to='api.worktask', verbose_name='Проводимые работы'),
        ),
    ]
