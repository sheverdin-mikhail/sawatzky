# Generated by Django 4.1 on 2023-10-16 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_tasks_workmaterialgroup_materials'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worktaskgroup',
            name='tasks',
            field=models.ManyToManyField(blank=True, to='api.worktask', verbose_name='Список услуг входящих в эту группу'),
        ),
    ]