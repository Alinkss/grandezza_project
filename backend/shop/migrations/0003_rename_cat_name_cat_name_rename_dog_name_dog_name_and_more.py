# Generated by Django 5.0.6 on 2024-07-29 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_cat_avaible_dog_avaible_rabbit_avaible_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cat',
            old_name='cat_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='dog',
            old_name='dog_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='rabbit',
            old_name='rabbit_name',
            new_name='name',
        ),
    ]
