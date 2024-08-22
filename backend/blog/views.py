from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.db.models import Q
from django.db.models import Count
from django.utils.timezone import now
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils import timezone
from django.views import View
from django.core.paginator import Paginator
from django import template


from blog.models import Category, Post, Tag, Comments, Adress, PostImage, Profile
from blog.forms import PostForm, PostImageForm, ImageFormSet, CommentsForm, AvatarForm, UserRegister, RegisterForm, UserUpdateForm, ProfileUpdate, AdressForm, AdressFormSet

def blog_main(request):
    posts = Post.objects.all().order_by('-published_date')
    tags = Tag.objects.all()
    categories = Category.objects.all()
    user = request.user

    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        post = Post.objects.get(id=post_id)
        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
        else:
            post.likes.add(user)
    
    paginator = Paginator(posts, 2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    liked_post_ids = []
    if user.is_authenticated:
        liked_post_ids = list(user.likes.values_list('id', flat=True))

    context = {
        'page_obj': list(page_obj.object_list.values()),
        'tags': list(tags.values()),
        'categories': list(categories.values()),
        'liked_post_ids': liked_post_ids,
    }
    
    return JsonResponse(context)

def search(request):
    query = request.GET.get('query-search', '')
    
    post = Post.objects.filter(Q(title__icontains=query) | Q(user__username__icontains = query))
    
    context = {
        'post': list(post.values()),
    }
    
    return JsonResponse(context)

def blog_categories(request, categ_id=None):
    category_obj = get_object_or_404(Category, pk=categ_id)
    
    posts = Post.objects.filter(category = category_obj).order_by('-published_date')
    number_of_posts = Post.objects.filter(category = category_obj).count()
    
    paginator = Paginator(posts, 2)
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'posts': list(posts.values()),
        'number_of_posts': number_of_posts,
        'page_obj': list(page_obj.object_list.values()),
        # 'categories': categories,
    }
    
    return JsonResponse(context)

def post(request, post_id=None):
    post = get_object_or_404(Post, id=post_id)
    comments = Comments.objects.filter(post = post).order_by('-published_date')
    user = request.user
    user_has_liked = post.likes.filter(id=user.id).exists()
    
    if request.method == 'POST':
        comments_form = CommentsForm(request.POST)
        if comments_form.is_valid():
            comment = comments_form.save(commit=False)
            comment.user = request.user
            comment.post = post
            comment.published_date = now()
            comment.save()
            return redirect('post', post_id=post.id)
        if user_has_liked:
            post.likes.remove(user)
            user_has_liked = False
        else:
            post.likes.add(user)
        
    comments_form = CommentsForm()
    
    context = {
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date,
            'likes_count': post.likes.count()
        },
        'comments': list(comments.values()),
        'comments_form': comments_form.as_p(),
        'user_has_liked': user_has_liked,
    }
    
    return JsonResponse(context)

@login_required
def likes(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    user_has_liked = post.likes.filter(id=user.id).exists()
    print(f"Debug: user_has_liked={user_has_liked}")
    
    if request.method == 'POST':
        if user_has_liked:
            post.likes.remove(user)
            user_has_liked = False
            print(f"Debug: User unliked post. user_has_liked={user_has_liked}")
        else:
            post.likes.add(user)
            user_has_liked = True
            print(f"Debug: User liked post. user_has_liked={user_has_liked}")
            
    post_user = {
        'id': post.user.id,
        'username': post.user.username,
        'email': post.user.email
    }        
            
    context = {
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date,
            'likes_count': post.likes.count(),
            'user': post_user
        },
        'user_has_liked': user_has_liked,
    }
    
    return JsonResponse(context)

def comment_button(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    
    if request.method == 'POST':
        return redirect('post', post_id=post.id)
        
    return redirect('post', post_id=post.id)

def comment_delete(request, post_id, comment_id):
    post = get_object_or_404(Post, id=post_id)
    comments = get_object_or_404(Comments, id=comment_id)
    
    if request.method == "POST":
        if request.user.is_authenticated:
            if request.user == comments.user:
                comments.delete()
                return redirect('post', post_id=post.id)
    post_user = {
        'id': post.user.id,
        'username': post.user.username,
        'email': post.user.email
    }
    
    comment_user = {
        'id': comments.user.id,
        'username': comments.user.username
    }                  
                
    context = {
        'comments': {
            'text': comments.text,
            'published_date': comments.published_date,
            'user': comment_user
        },
         'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date,
            'likes_count': post.likes.count(),
            'user': post_user
        },
    }
    
    return JsonResponse(context)
        

@login_required
def create(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        image_form = ImageFormSet(request.POST, request.FILES, queryset=PostImage.objects.none())
        if form.is_valid() and image_form.is_valid():
            post = form.save(commit=False)
            post.published_date = now()
            post.user = request.user
            post.save()
            
            for form in image_form.cleaned_data:
                if form:
                    image = form['image']
                    PostImage.objects.create(post=post, image=image)
                    
            return redirect('blog_main')
        
    form = PostForm()
    image_form = ImageFormSet(queryset=PostImage.objects.none())
    
    context = {
        'form': form.as_p(),
        'image_form':image_form.as_p(),
    }
    
    return JsonResponse(context)
    
@login_required
def profile(request, user_id):
    user = User.objects.get(id = user_id)
    profile = get_object_or_404(Profile, user = user)
    
    posts = Post.objects.filter(user = user).order_by('-published_date')
    comments = Comments.objects.filter(user = user)
    adresses = Adress.objects.filter(profile = profile)
    
    posts_number = Post.objects.filter(user = user).count()
    comments_number = Comments.objects.filter(user = user).count()
    days_since_registration = (timezone.now() - user.date_joined).days
    
    liked_posts = Post.objects.filter(likes=user)
    
    avatar = profile.avatar.url
    background_pic = profile.background_pic.url
    
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        posts = Post.objects.get(id=post_id)
        if posts.likes.filter(id=user).exists():
            post.liked.remove(user)
        else:
            post.liked.add(user)
            
    liked_posts_id = list(user.likes.values_list('id', flat=True))

    
    user_serial = {
        'id': user.id,
        'username': user.username
    }
    countries_serial = list(profile.country.values('id', 'name')) if profile.country.exists() else []
    cities_serial = list(profile.city.values('id', 'name')) if profile.city.exists() else []
    
    adresses_serial = list(adresses.values('id', 'street', 'private_house_number', 'entrance_number', 'flat_num'))
    liked_posts_serial = list(liked_posts.values('id', 'title', 'content', 'published_date'))
    posts_serial = list(posts.values('id', 'title', 'content', 'published_date'))
    comments_serial = list(comments.values('id', 'text', 'published_date'))
    
    liked_posts_id = list(user.likes.values_list('id', flat=True))
    
    context = {
        'user': user_serial,
        'profile': {
            'id': profile.id,
            'telephone': profile.telephone,
            'avatar': profile.avatar.url if profile.avatar else None,
            'country': countries_serial,
            'city': cities_serial,
            'background_pic': profile.background_pic.url if profile.background_pic else None
        },
        'posts': posts_serial,
        'comments': comments_serial,
        'posts_number': posts_number,
        'comments_number': comments_number,
        'days_since_register': days_since_registration,
        'adresses': adresses_serial,
        'liked_posts': liked_posts_serial,
        'liked_posts_id': liked_posts_id,
    }
    
    return JsonResponse(context)

def registration(request):
    if request.method == 'POST':
        user_form = UserRegister(request.POST)
        register_form = RegisterForm(request.POST, request.FILES)
        adress_form = AdressForm(request.POST)
        
        if user_form.is_valid() and register_form.is_valid() and adress_form.is_valid():
            user = user_form.save()
            register = register_form.save(commit=False)
            register.user = user
            register.save()
            
            adress = adress_form.save(commit=False)
            adress.profile = register
            adress.save()
            
            login(request, user)
            return redirect('profile', user_id=user.id)
        else:
            print(user_form.errors)
            print(register_form.errors)
            print(adress_form.errors)
            print(request.FILES)
        
    user_form = UserRegister()
    register_form = RegisterForm()
    adress_form = AdressForm()
    
    context = {
        'user_form': user_form,
        'register_form': register_form,
        'adress_form': adress_form,
    }
    
    return render(request, 'registration/register.html', context)

class MyLogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('main')
    
@login_required
def update_profile(request):
    if request.method == 'POST':
        user_update_form = UserUpdateForm(request.POST, instance=request.user)
        profile_update_form = ProfileUpdate(request.POST, request.FILES, instance=request.user.profile)
        adress_setform = AdressFormSet(request.POST, instance=request.user.profile)
        avatar_form = AvatarForm(request.POST, request.FILES, instance=request.user.profile)
        
        if user_update_form.is_valid() and profile_update_form.is_valid() and adress_setform.is_valid() and avatar_form.is_valid():
            user_update_form.save()
            profile_update_form.save()
            adress_setform.save()
            avatar_form.save()
            
            return redirect('profile', user_id=request.user.pk)
        
    else:
        user_update_form = UserUpdateForm(instance=request.user)
        profile_update_form = ProfileUpdate(instance=request.user.profile)
        adress_setform = AdressFormSet(instance=request.user.profile)
        avatar_form = AvatarForm(instance=request.user.profile)
        if not adress_setform:
            adress_setform = AdressFormSet(queryset=Adress.objects.none(), instance=request.user.profile)
            
    context = {
        'user_update_form': user_update_form,
        'profile_update': profile_update_form,
        'adress_setform': adress_setform,
        'avatar_form': avatar_form,
    }
        
    return render(request, 'registration/update_profile.html', context)