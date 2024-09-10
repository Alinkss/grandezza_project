from django.urls import path
from . import views
# from django.contrib.auth.views import LoginView, LogoutView
# from .views import MyLogoutView
# from django.contrib import admin

urlpatterns = [
    path('', views.main, name='main'),
    path('catalog', views.catalog, name='catalog'),
    # path('catalog_category/<int:categ_id>/', views.catalog_category, name='catalog_category'),
    path('cat_category', views.cat_category, name='cat_category'),
    path('dog_category', views.dog_category, name='dog_category'),
    path('rabbit_category', views.rabbit_category, name='rabbit_category'),
    path('search', views.search_shop, name='search_shop'),
    path('product_detail/<int:id>/', views.product_detail, name='product_detail'),
    path('contact', views.contact_us, name='contact'),
    path('for_pets/<int:prod_id>', views.for_pets, name='for_pets'),
    path('product', views.product, name='product'),
    path('comments/<int:prod_id>', views.comments, name='comments'),
    path('get_product_comments/<int:prod_id>',
         views.get_product_comments, name='get_product_comments')
    # path('products', views.products, name='products'),
]
