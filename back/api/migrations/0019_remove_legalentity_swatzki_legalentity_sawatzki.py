# Generated by Django 4.1 on 2023-11-11 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_remove_workobjectsgroup_code_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='legalentity',
            name='swatzki',
        ),
        migrations.AddField(
            model_name='legalentity',
            name='sawatzki',
            field=models.BooleanField(default=False, verbose_name='Относится к Sawatzky'),
        ),
    ]
