from django.contrib import admin
from .models import Post, Category, Tag, City, Country

admin.site.register(Post)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Country)
admin.site.register(City)
# Register your models here.
