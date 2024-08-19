from django.db import models
from django.contrib.auth.models import User
from blog.models import Profile
from shop.models import Pets


class Order(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField()
    adress = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=1)
    
    class Meta:
        ordering = ('-created',)
        
    def __str__(self):
        return f'Order: {self.id}'
    
    def get_total_cost(self):
        return sum(item.get_cost() for item in self.item.all())
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Pets, related_name='order_item', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f'{self.id}'
    
    def get_cost(self):
        return self.price * self.quantity
