# Generated by Django 5.0.6 on 2024-08-13 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_contactus'),
    ]

    operations = [
        migrations.AddField(
            model_name='pets',
            name='description',
            field=models.CharField(blank=True, max_length=600, null=True),
        ),
    ]
