# Generated by Django 2.2.7 on 2020-01-09 02:17

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_auto_20200109_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 1, 9, 2, 17, 3, 471488, tzinfo=utc), verbose_name='creation date'),
        ),
    ]
