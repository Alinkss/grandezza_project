from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=250)
    
    def __str__(self):
        return self.name
    
class Tag(models.Model):
    name = models.CharField(max_length=250)
    
    def __str__(self):
        return self.name
    
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    likes = models.ManyToManyField(User, related_name='likes')
    
    def __str__(self):
        return f"{self.title}: {self.category}"
    
class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images', null=True, blank=True)
    
    def __str__(self):
        return f"{self.post} - {self.image}"
    
class Comments(models.Model):
    text = models.TextField(max_length=600)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    published_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.text}"
    
    
class Country(models.Model):
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
    
class City(models.Model):
    name = models.CharField(max_length=80)
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telephone = models.CharField(max_length=25)
    avatar = models.ImageField(upload_to='user_avatars', null=True, blank=True, default='user_avatars/default-avatar.webp')
    country = models.ManyToManyField(Country)
    city = models.ManyToManyField(City)
    background_pic = models.ImageField(upload_to='background_pic', null=True, blank=True, default='background_pic/profile-picture-background-1uip4ytll6lbmfp5.jpg')
    
    def __str__(self):
        return self.user.username
    
class Adress(models.Model):
    street = models.CharField(max_length=300)
    private_house_number = models.IntegerField(null=True, blank=True)
    entrance_number = models.CharField(max_length=40, null=True, blank=True)
    flat_num = models.IntegerField(null=True, blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.street}, {self.private_house_number}, {self.entrance_number}, {self.flat_num}"

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('post', 'user')