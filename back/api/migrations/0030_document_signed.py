# Generated by Django 4.1 on 2023-12-05 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_employee_powerofattorneynumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='signed',
            field=models.BooleanField(default=False, verbose_name='подписан/не подписан'),
        ),
    ]
