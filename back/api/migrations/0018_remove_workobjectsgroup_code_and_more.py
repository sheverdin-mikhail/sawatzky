# Generated by Django 4.1 on 2023-11-10 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_application_workmaterials_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workobjectsgroup',
            name='code',
        ),
        migrations.AddField(
            model_name='legalentity',
            name='workTaskGroups',
            field=models.ManyToManyField(blank=True, null=True, to='api.worktaskgroup', verbose_name='Предоставляемые группы услуг'),
        ),
        migrations.AlterField(
            model_name='workobjectsgroup',
            name='workObjects',
            field=models.ManyToManyField(blank=True, null=True, related_name='workObjectsGroup', to='api.workobject', verbose_name='Список объектов'),
        ),
    ]
