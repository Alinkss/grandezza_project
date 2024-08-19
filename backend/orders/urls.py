from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.order_created, name='order_created_without_user'),
    path('create/<int:user_id>/', views.order_created, name='order_created'),
]
