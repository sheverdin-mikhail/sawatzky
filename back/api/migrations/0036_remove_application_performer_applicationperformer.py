# Generated by Django 4.1 on 2023-12-12 01:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_applicationperformer_applicationemployee'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='performer',
        ),
    ]
