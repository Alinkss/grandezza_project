from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView
# from .views import MyLogoutView

urlpatterns = [
    path('blog_main', views.blog_main, name= 'blog_main'),
    path('create', views.create, name='create'),
    path('search', views.search, name='search'),
    path('blog_categories/<int:categ_id>/', views.blog_categories, name='blog_categories'),
    path('post/<int:post_id>/', views.post, name='post'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', views.logout_jwt, name='logout'),
    path('registration', views.registration, name='registration'),
    path('user/<int:user_id>/', views.user, name='user'),
    path('profile/<int:user_id>/', views.profile, name='profile'),
    path('/<int:post_id>/<int:comment_id>', views.comment_delete, name='comment_delete'),
    path('likes/<int:post_id>/', views.likes, name='likes'),
    path('update_profile', views.update_profile, name='update_profile'),
    path('comment_button/<int:post_id>/', views.comment_button, name='comment_button'),
    path('my_view', views.my_view, name='my_view'),
    path('login_jwt', views.login_jwt, name='login_jwt'),
    path('get_user_by_jwt', views.get_user_by_jwt, name='get_user_by_jwt')
]
