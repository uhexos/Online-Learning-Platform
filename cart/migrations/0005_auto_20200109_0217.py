# Generated by Django 2.2.7 on 2020-01-09 02:17

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0004_auto_20200109_0217'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 1, 9, 2, 17, 17, 727627, tzinfo=utc), verbose_name='creation date'),
        ),
    ]
