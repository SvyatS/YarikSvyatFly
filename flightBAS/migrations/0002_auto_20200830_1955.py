# Generated by Django 2.2.6 on 2020-08-30 16:55

from django.db import migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('flightBAS', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flight',
            name='date',
        ),
        migrations.RemoveField(
            model_name='flight',
            name='end_point',
        ),
        migrations.RemoveField(
            model_name='flight',
            name='start_point',
        ),
        migrations.AddField(
            model_name='flight',
            name='polygon',
            field=jsonfield.fields.JSONField(default=dict),
        ),
    ]