from django.contrib import admin
from .models import Catalog, Pets, Gender, Coat, Color, Fur, Size, Breed

admin.site.register(Catalog)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'avaible']
    list_filter = ['avaible', 'price']
    list_editable = ['price', 'avaible']
    
admin.site.register(Pets, ProductAdmin)
admin.site.register(Coat)
admin.site.register(Breed)
admin.site.register(Size)
admin.site.register(Fur)
admin.site.register(Color)
admin.site.register(Gender)
# Register your models here.
