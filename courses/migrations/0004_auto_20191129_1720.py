# Generated by Django 2.2.7 on 2019-11-29 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_course_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='video',
            field=models.FileField(help_text='Enter course video', null=True, upload_to='lesson_videos'),
        ),
    ]