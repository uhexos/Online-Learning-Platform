# Generated by Django 2.2.7 on 2020-03-01 14:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0024_auto_20200301_1403'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='courserating',
            unique_together={('owner', 'course')},
        ),
    ]
