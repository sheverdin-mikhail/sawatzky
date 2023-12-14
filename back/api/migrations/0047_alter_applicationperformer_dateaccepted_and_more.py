# Generated by Django 4.1 on 2023-12-13 22:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_alter_applicationperformer_dateaccepted_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationperformer',
            name='dateAccepted',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 13, 22, 13, 5, 525746, tzinfo=datetime.timezone.utc), verbose_name='Дата принятия'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='applicationperformer',
            name='dateDeclined',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 13, 22, 13, 43, 987854, tzinfo=datetime.timezone.utc), verbose_name='Дата отказа'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='applicationperformer',
            name='dateSent',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 12, 13, 22, 13, 47, 925462, tzinfo=datetime.timezone.utc), verbose_name='Дата отправки'),
            preserve_default=False,
        ),
    ]