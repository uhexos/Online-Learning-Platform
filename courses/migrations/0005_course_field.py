# Generated by Django 2.2.7 on 2019-12-25 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_auto_20191129_1720'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='field',
            field=models.DecimalField(decimal_places=2, default='0.0', max_digits=8),
        ),
    ]
