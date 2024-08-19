from django.db import models
from django.urls import reverse

from django.urls import reverse


class Gender(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Catalog(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Coat(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name
    
class Breed(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name
    
class Size(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name
    
class Fur(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name
    
class Color(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name
    
class Pets(models.Model):
    PRODUCT_TYPES = (
        ('cat', 'Cat'),
        ('dog', 'Dog'),
        ('rabbit', 'Rabbit')
    )
    
    type = models.CharField(max_length=30, choices= PRODUCT_TYPES)
    name = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=600, null=True, blank=True)
    images = models.ImageField(upload_to='product_images')
    category = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    avaible = models.BooleanField(default=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)   
    fur = models.ForeignKey(Fur, on_delete=models.CASCADE, null=True, blank=True, related_name='fur_set')
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True, blank=True, related_name='color_set')
    coat = models.ForeignKey(Coat, on_delete=models.CASCADE, null=True, blank=True, related_name='coat_set')
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, null=True, blank=True, related_name='breed_set')
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True, blank=True, related_name='size_set')

    def __str__(self):
        return f"{self.name} ({self.type})"
    
    def get_absolute_url(self):
        return reverse("product_detail", kwargs={"id": self.id})
    
class ContactUs(models.Model):
    first_name = models.CharField(max_length=40)
    email = models.EmailField()
    message = models.CharField(max_length=400, null=True, blank=True)
    
    def __str__(self):
        return f"{self.first_name}, {self.email}"
    
# class Cloth(models.Model):
#     category = models.ForeignKey(Catalog, on_delete=models.CASCADE)
#     name = models.CharField(max_length=600)
#     avaible = models.BooleanField(default=True)
#     quantity = models.