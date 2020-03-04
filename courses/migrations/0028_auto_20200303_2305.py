# Generated by Django 2.2.7 on 2020-03-03 23:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0027_auto_20200303_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrolledcourses',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bought_courses', to='courses.Course'),
        ),
        migrations.AlterField(
            model_name='enrolledcourses',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
