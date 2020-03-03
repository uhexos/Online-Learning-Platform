# Generated by Django 2.2.7 on 2020-03-03 11:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0025_auto_20200301_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrolledcourses',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bought_courses', to='courses.Course'),
        ),
    ]