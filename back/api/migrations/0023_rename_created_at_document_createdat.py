# Generated by Django 4.1 on 2023-11-28 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_remove_legalentity_worktaskgroups_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='created_at',
            new_name='createdAt',
        ),
    ]
