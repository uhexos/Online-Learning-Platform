# Generated by Django 2.2.7 on 2019-11-29 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_auto_20191123_1052'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='thumbnail',
            field=models.ImageField(help_text='Enter course thumbnail', null=True, upload_to='course_thumbnails'),
        ),
    ]
