# Generated by Django 2.2.7 on 2020-03-01 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0019_auto_20200224_2211'),
    ]

    operations = [
        migrations.RenameField(
            model_name='courserating',
            old_name='score',
            new_name='rating',
        ),
    ]
