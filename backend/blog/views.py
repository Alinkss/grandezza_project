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
from blog.forms import PostForm, PostImageForm, ImageFormSet, CommentsForm, AvatarForm, UserRegister, UserUpdateForm, AdressForm, AdressFormSet


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
<<<<<<< HEAD
        
=======


>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
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
<<<<<<< HEAD
    
    # avatar = profile.avatar.url
    # background_pic = profile.background_pic.url
    
=======

    avatar = profile.avatar.url
    background_pic = profile.background_pic.url

>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
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


def registration(request):
    if request.method == 'POST':
<<<<<<< HEAD
        user_form = UserRegister(request.POST, request.FILES)
        
        if user_form.is_valid():
            user = user_form.save(commit=True)
=======
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

>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
            login(request, user)

            user_form_data = {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'date_joined': user.date_joined.isoformat()
            }
<<<<<<< HEAD
            
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
=======

            register_form_data = {
                'user': user.id,
                'telephone': register.telephone,
                'avatar': register.avatar.url if register.avatar else '',
                'country': list(register_form.instance.country.values_list('name', flat=True)),
                'city': list(register_form.instance.city.values_list('name', flat=True)),
                'background_pic': register.background_pic.url if register.background_pic else ''
            }

>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
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
                }
            }

            return JsonResponse(forms_data)
        else:
            errors = {
                'user_form_errors': user_form.errors.as_json(),
            }
            return JsonResponse(errors, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

<<<<<<< HEAD
# def registration(request):
#     if request.method == 'POST':
#         user_form = UserRegister(request.POST, request.FILES)
#         adress_form = AdressForm(request.POST)

#         if user_form.is_valid() and adress_form.is_valid():
#             user = user_form.save(commit=False)
#             user.save()
#             profile = Profile.objects.create(
#                 user=user,
#                 avatar=user_form.cleaned_data.get('avatar'),
#                 background_pic=user_form.cleaned_data.get('background_pic'),
#                 telephone=user_form.cleaned_data.get('telephone')
#             )
#             profile.country.set(user_form.cleaned_data.get('country'))
#             profile.city.set(user_form.cleaned_data.get('city'))
#             profile.save()

#             Adress.objects.create(
#                 profile=profile,
#                 private_house_number=user_form.cleaned_data.get('private_house_number'),
#                 entrance_number=user_form.cleaned_data.get('entrance_number'),
#                 flat_num=user_form.cleaned_data.get('flat_num'),
#                 street=user_form.cleaned_data.get('street')
#             )

#             login(request, user)  # Log in the user
#             return redirect('profile', user_id=user.id)
#         else:
#             # Print form errors for debugging
#             print(user_form.errors)
#             print(adress_form.errors)
#             print(request.FILES)

#     else:
#         user_form = UserRegister()
#         adress_form = AdressForm()

#     context = {
#         'user_form': user_form,
#         'adress_form': adress_form,
#     }

#     return render(request, 'registration/register.html', context)
=======
>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37

class MyLogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('main')


@login_required
def update_profile(request):
<<<<<<< HEAD
    if request.method == 'POST':
        user_update_form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
        
        if user_update_form.is_valid():
            user = user_update_form.save(commit=False)
            profile = user.profile


            profile.telephone = user_update_form.cleaned_data['telephone']
            profile.avatar = user_update_form.cleaned_data.get('avatar')
            profile.background_pic = user_update_form.cleaned_data.get('background_pic')
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
=======
    user_update_form = UserUpdateForm(request.POST, instance=request.user)
    profile_update_form = ProfileUpdate(
        request.POST, request.FILES, instance=request.user.profile)
    adress_setform = AdressFormSet(
        request.POST, request.FILES,  instance=request.user.profile)
    avatar_form = AvatarForm(request.POST, request.FILES,
                             instance=request.user.profile)

    if request.method == 'POST':

        if (user_update_form.is_valid() and
            profile_update_form.is_valid() and
            adress_setform.is_valid() and
                avatar_form.is_valid()):

            user_update = user_update_form.cleaned_data
>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37

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
<<<<<<< HEAD
                        'telephone': profile.telephone,
                        'country': list(profile.country.values_list('name', flat=True)),
                        'city': list(profile.city.values_list('name', flat=True)), 
=======
                        'telephone': profile_update_form.cleaned_data.get('telephone'),
                        'country': list(profile_update_form.instance.country.values_list('name', flat=True)),
                        'city': list(profile_update_form.instance.city.values_list('name', flat=True)),
>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
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
<<<<<<< HEAD
                    'cleaned_data':{
                        'avatar': profile.avatar.url if profile.avatar else None
=======
                    'cleaned_data': {
                        'avatar': request.user.profile.avatar.url if request.user.profile.avatar else None
>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37
                    }
                },
            }

<<<<<<< HEAD
            return JsonResponse(forms_data)
        else:
            errors = {
                'user_form_errors': user_update_form.errors.as_json(),
            }
            return JsonResponse(errors, status=400)
        
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# @login_required
# def update_profile(request):
#     if request.method == 'POST':
#         user_update_form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
        
#         if user_update_form.is_valid():
#             user_update_form.save()
#             return redirect('profile', user_id=request.user.pk)
#         else:
#             print(user_update_form.errors)

#     else:
#         user_update_form = UserUpdateForm(instance=request.user)

#     context = {
#         'user_update_form': user_update_form,
#     }

#     return render(request, 'registration/update_profile.html', context)
=======
            user_update_form.save()
            profile_update_form.save()
            adress_setform.save()
            avatar_form.save()

            return JsonResponse(forms_data)

    forms_data = {
        'user_update': {
            'is_valid': user_update_form.is_valid(),
            'errors': user_update_form.errors.as_json(),
            'cleaned_data': None
        },
        'profile_update': {
            'is_valid': profile_update_form.is_valid(),
            'errors': profile_update_form.errors.as_json(),
            'cleaned_data': None
        },
        'adress_update': {
            'is_valid': adress_setform.is_valid(),
            'errors': {form.prefix: form.errors.as_json() for form in adress_setform},
            'cleaned_data': None
        },
        'avatar_update': {
            'is_valid': avatar_form.is_valid(),
            'errors': avatar_form.errors.as_json(),
            'cleaned_data': None
        },
    }
    print(user_update_form.errors)
    print(profile_update_form.errors)
    print(adress_setform.errors)
    print(avatar_form.errors)
    print(request.user.profile.telephone)
    print('User profile:', request.user.profile)
    print('POST data:', request.POST)
    print('FILES data:', request.FILES)

    return JsonResponse(forms_data)
>>>>>>> 2a39d4d37298bf16ef5fe7f6d170a5b1e09b5e37


@login_required
def my_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'status': 'logged_in'})
    else:
        return JsonResponse({'status': 'not_logged_in'}, status=401)
