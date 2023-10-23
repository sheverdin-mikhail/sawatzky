# Generated by Django 4.1 on 2023-10-21 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_application_workmaterials_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='workMaterials',
            field=models.ManyToManyField(blank=True, null=True, related_name='application', through='api.ApplicationWorkMaterial', to='api.workmaterial', verbose_name='Материалы для работы'),
        ),
        migrations.AddField(
            model_name='application',
            name='workTasks',
            field=models.ManyToManyField(blank=True, null=True, related_name='application', through='api.ApplicationWorkTask', to='api.worktask', verbose_name='Проводимые работы'),
        ),
    ]