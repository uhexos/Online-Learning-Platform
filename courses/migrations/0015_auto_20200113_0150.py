# Generated by Django 2.2.7 on 2020-01-13 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0014_category_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='thumbnail',
            field=models.ImageField(default='default_course_img.jpg', help_text='Enter course thumbnail', null=True, upload_to='course_thumbnails'),
        ),
    ]
