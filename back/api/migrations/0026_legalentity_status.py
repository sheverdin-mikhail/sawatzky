# Generated by Django 4.1 on 2023-11-30 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_remove_client_workobjectsgroup_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='legalentity',
            name='status',
            field=models.BooleanField(default=False, verbose_name='Статус контрагента'),
        ),
    ]