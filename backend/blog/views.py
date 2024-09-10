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
from django.core.mail import send_mail
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)
from django.contrib.auth import get_user_model


from blog.models import Category, Post, Tag, Comments, Adress, PostImage, Profile
from blog.forms import PostForm, PostImageForm, ImageFormSet, CommentsForm, AvatarForm, UserRegister, UserUpdateForm, AdressForm, AdressFormSet, LoginForm, JwtForm


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

    post = Post.objects.filter(
        Q(title__icontains=query) | Q(user__username__icontains=query))

    context = {
        'post': list(post.values()),
    }

    return JsonResponse(context)


def blog_categories(request, categ_id=None):
    category_obj = get_object_or_404(Category, pk=categ_id)

    posts = Post.objects.filter(
        category=category_obj).order_by('-published_date')
    number_of_posts = Post.objects.filter(category=category_obj).count()

    paginator = Paginator(posts, 2)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'posts': list(posts.values()),
        'number_of_posts': number_of_posts,
        'page_obj': list(page_obj.object_list.values()),
    }

    return JsonResponse(context)


def post(request, post_id=None):
    post = get_object_or_404(Post, id=post_id)
    comments = Comments.objects.filter(post=post).order_by('-published_date')
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

            user_data = {
                'username': user.username
            }

            comments_cd = {
                'id': comment.id,
                'text': comment.text,
                'published_date': comment.published_date.isoformat(),
                'user': user_data
            }

            form_data = {
                'is_valid': True,
                'errors': None,
                'cleaned_data': comments_cd
            }

            return JsonResponse(form_data)
        if user_has_liked:
            post.likes.remove(user)
            user_has_liked = False
        else:
            post.likes.add(user)

    context = {
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date,
            'likes_count': post.likes.count()
        },
        'comments': list(comments.values()),
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
        user_data = {
            'id': request.user.id,
            'username': request.user.username
        }

        category_data = {
            'id': post.category.id,
            'name': post.category.name
        } if post.category else None

        image_urls = []

        post_cd = {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date.isoformat(),
            'user': user_data,
            'category': category_data
        }

        form_data = {
            'post_form': {
                'is_valid': True,
                'errors': None,
                'cleaned_data': post_cd
            },
            'image_form': {
                'is_valid': True,
                'errors': None,
                'cleaned_data': image_urls
            }
        }

        user_data = {
            'id': request.user.id,
            'username': request.user.username
        }

        category_data = {
            'id': post.category.id,
            'name': post.category.name
        } if post.category else None

        image_urls = []

        post_cd = {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'published_date': post.published_date.isoformat(),
            'user': user_data,
            'category': category_data
        }

        form_data = {
            'post_form': {
                'is_valid': True,
                'errors': None,
                'cleaned_data': post_cd
            },
            'image_form': {
                'is_valid': True,
                'errors': None,
                'cleaned_data': image_urls
            }
        }

    return JsonResponse(form_data)


def comment_delete(request, post_id, comment_id):
    post = get_object_or_404(Post, id=post_id)
    comments = get_object_or_404(Comments, id=comment_id)

    if request.method == "POST":
        if request.user.is_authenticated and request.user == comments.user:
            if request.user == comments.user:
                comments.delete()
                return JsonResponse({'success': True, 'message': 'Comment deleted successfully'})

        return JsonResponse({
            'success': False,
            'message': 'Comment not deleted successfully'
        })


@login_required
def create(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        image_form = ImageFormSet(
            request.POST, request.FILES, queryset=PostImage.objects.none())
        if form.is_valid() and image_form.is_valid():
            post = form.save(commit=False)
            post.published_date = now()
            post.user = request.user
            post.save()

            user_data = {
                'id': request.user.id,
                'username': request.user.username
            }

            category_data = {
                'id': post.category.id,
                'name': post.category.name
            } if post.category else None

            image_urls = []

            post_cd = {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'published_date': post.published_date.isoformat(),
                'user': user_data,
                'category': category_data
            }

            form_data = {
                'post_form': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': post_cd
                },
                'image_form': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': image_urls
                }
            }

            for form in image_form.cleaned_data:
                if form:
                    image = form['image']
                    post_image = PostImage.objects.create(
                        post=post, image=image)
                    image_urls.append(post_image.image.url)

            return JsonResponse(form_data)
        else:
            form_errors = form.errors.as_json() if not form.is_valid() else None
            image_form_errors = image_form.errors.as_json(
            ) if not image_form.is_valid() else None

            errors = {
                'post_form_errors': form_errors,
                'image_form_errors': image_form_errors
            }

            return JsonResponse(errors, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def user(request, user_id):
    user = User.objects.get(id=user_id)

    context = {
        'user': {
            'id': user.id,
            'username': user.username
        },
    }

    return JsonResponse(context)


@login_required
def profile(request, user_id):
    user = User.objects.get(id=user_id)
    profile = get_object_or_404(Profile, user=user)

    posts = Post.objects.filter(user=user).order_by('-published_date')
    comments = Comments.objects.filter(user=user)
    adresses = Adress.objects.filter(profile=profile)

    posts_number = Post.objects.filter(user=user).count()
    comments_number = Comments.objects.filter(user=user).count()
    days_since_registration = (timezone.now() - user.date_joined).days

    liked_posts = Post.objects.filter(likes=user)

    # avatar = profile.avatar.url
    # background_pic = profile.background_pic.url

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
    countries_serial = list(profile.country.values(
        'id', 'name')) if profile.country.exists() else []
    cities_serial = list(profile.city.values('id', 'name')
                         ) if profile.city.exists() else []

    adresses_serial = list(adresses.values(
        'id', 'street', 'private_house_number', 'entrance_number', 'flat_num'))
    liked_posts_serial = list(liked_posts.values(
        'id', 'title', 'content', 'published_date'))
    posts_serial = list(posts.values(
        'id', 'title', 'content', 'published_date'))
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


def jwt_token(user):
    payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': datetime.utcnow() + settings.JWT_EXPIRATION_DELTA,
        'iat': datetime.utcnow()
    }

    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
    return token


# def get_user_by_jwt(request):
#     if request.method == 'POST':
#         jwt_form = JwtForm(request.POST)
#         if jwt_form.is_valid():
#             token = jwt_form.cleaned_data['token']

#             userdata = jwt.decode(
#                 token, settings.JWT_SECRET_KEY, algorithms='HS256')
#             return JsonResponse(userdata)

def decode_jwt(token):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(id=payload['user_id'])
        return user
    except jwt.ExpiredSignatureError:
        logger.error("Token has expired")
        return None
    except jwt.InvalidTokenError:
        logger.error("Invalid token")
        return None
    except get_user_model().DoesNotExist:
        logger.error("User does not exist")
        return None

@csrf_exempt
def get_user_by_jwt(request):
    if request.method == 'POST':
        form = JwtForm(request.POST)
        if form.is_valid():
            token = form.cleaned_data['token']
            user = decode_jwt(token)
            if user:
                user_data = {
                    'user_id': user.id,
                    'username': user.username,
                    'email': user.email
                }
                return JsonResponse({'user': user_data})
            else:
                return JsonResponse({'error': 'Invalid token'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid form'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def registration(request):
    if request.method == 'POST':
        user_form = UserRegister(request.POST, request.FILES)

        if user_form.is_valid():
            user = user_form.save(commit=True)
            token = jwt_token(user)
            # login(request, user)

            user_form_data = {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'date_joined': user.date_joined.isoformat()
            }

            profile = user.profile
            register_form_data = {
                'user': user.id,
                'telephone': profile.telephone,
                'avatar': profile.avatar.url if profile.avatar else '',
                'country': list(profile.country.values_list('name', flat=True)),
                'city': list(profile.city.values_list('name', flat=True)),
                'background_pic': profile.background_pic.url if profile.background_pic else ''
            }

            adress = profile.adress_set.first()
            adress_form_data = {
                'id': adress.id,
                'private_house_number': adress.private_house_number if adress.private_house_number else None,
                'entrance_number': adress.entrance_number if adress.entrance_number else None,
                'street': adress.street,
                'flat_num': adress.flat_num if adress.flat_num else None,
                'profile_id': adress.profile.id
            }

            forms_data = {
                'user_check': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': user_form_data
                },
                'register_check': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': register_form_data
                },
                'adress_check': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': adress_form_data
                },
                'token': token
            }

            subject = 'Welcome to Grandezza!'
            message = f"""
            Hi {user.username},
            Thank you for registration at our side!

            """
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [user.email]
            send_mail(subject, message, email_from, recipient_list)

            return JsonResponse(forms_data)
        else:
            errors = {
                'user_form_errors': user_form.errors.as_json(),
            }
            return JsonResponse(errors, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_jwt(request):
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            
            if user is not None:
                user.last_login = now()
                user.save()

            if user is not None:
                token = jwt_token(user)

                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'is_staff': user.is_staff,
                }

                response_data = {
                    'user': user_data,
                    'token': token
                }

                return JsonResponse(response_data)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        else:
            return JsonResponse({'errors': login_form.errors.as_json()}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def logout_jwt(request):
    if request.method == 'POST':
        return JsonResponse({'message': 'you succesfully logout'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
def update_profile(request):
    if request.method == 'POST':
        user_update_form = UserUpdateForm(
            request.POST, request.FILES, instance=request.user)

        if user_update_form.is_valid():
            user = user_update_form.save(commit=False)
            profile = user.profile

            profile.telephone = user_update_form.cleaned_data['telephone']
            profile.avatar = user_update_form.cleaned_data.get('avatar')
            profile.background_pic = user_update_form.cleaned_data.get(
                'background_pic')
            profile.save()

            profile.country.set(user_update_form.cleaned_data['country'])
            profile.city.set(user_update_form.cleaned_data['city'])

            address_data = {
                'street': user_update_form.cleaned_data.get('street', ''),
                'private_house_number': user_update_form.cleaned_data.get('private_house_number', ''),
                'entrance_number': user_update_form.cleaned_data.get('entrance_number', ''),
                'flat_num': user_update_form.cleaned_data.get('flat_num', ''),
            }
            address, created = Adress.objects.get_or_create(profile=profile)
            for field, value in address_data.items():
                setattr(address, field, value)
            address.save()

            forms_data = {
                'user_update': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': {
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email
                    }
                },
                'profile_update': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': {
                        'telephone': profile.telephone,
                        'country': list(profile.country.values_list('name', flat=True)),
                        'city': list(profile.city.values_list('name', flat=True)),
                    }
                },
                'address_update': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': address_data
                },
                'avatar_update': {
                    'is_valid': True,
                    'errors': None,
                    'cleaned_data': {
                        'avatar': profile.avatar.url if profile.avatar else None
                    }
                },
            }

            return JsonResponse(forms_data)
        else:
            errors = {
                'user_form_errors': user_update_form.errors.as_json(),
            }
            return JsonResponse(errors, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
def my_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'status': 'logged_in'})
    else:
        return JsonResponse({'status': 'not_logged_in'}, status=401)
