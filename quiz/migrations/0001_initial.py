# Generated by Django 2.2.7 on 2020-04-29 00:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0031_auto_20200330_1340'),
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.TextField(help_text='Enter option prompt ')),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Enter quiz title', max_length=150)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz', to='courses.Lesson')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.TextField(help_text='Enter question prompt ')),
                ('answer', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='quiz.Option')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question', to='quiz.Quiz')),
            ],
        ),
        migrations.AddField(
            model_name='option',
            name='owning_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option', to='quiz.Question'),
        ),
    ]
