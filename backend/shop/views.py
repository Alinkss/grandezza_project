from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

from blog.views import get_user_by_jwt, decode_jwt
from .models import Catalog, Pets, Breed, Coat, Size, Color, Fur, Gender, ContactUs, PetProd, ProductReview, ProdComment
from shop.forms import ContactUsForm, RatingForm, CommentForm


from django.db.models import Q


def main(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            form_check = {
                'first_name': form.cleaned_data.get('first_name', ''),
                'email': form.cleaned_data.get('email', ''),
                'message': form.cleaned_data.get('message', ''),
            }
            form_data = {
                'is_valid': True,
                'errors': None,
                'cleaned_data': form_check
            }
            return JsonResponse(form_data)
        else:
            errors = {
                'form_check_error': form.errors.as_json()
            }
            return JsonResponse(errors)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def catalog(request):
    pets = Pets.objects.all()
    categories = Catalog.objects.all()
    products = PetProd.objects.all()

    context = {
        'pets': list(pets.values()),
        'categories': list(categories.values()),
        'products': list(products.values()),
    }

    return JsonResponse(context)


def cat_category(request):
    categories = Catalog.objects.all()
    pets = Pets.objects.filter(type='cat')
    genders = Gender.objects.all()

    cat_coats = Coat.objects.all()
    cat_breeds = Breed.objects.all()

    cat_gender = request.GET.getlist('cat-gender')
    cat_coat = request.GET.getlist('cat-coat')
    cat_breed = request.GET.getlist('cat-breed')

    filter_criteria = Q()

    if cat_gender:
        filter_criteria &= Q(gender__name__in=cat_gender)
    if cat_coat:
        filter_criteria &= Q(coat__name__in=cat_coat)
    if cat_breed:
        filter_criteria &= Q(breed__name__in=cat_breed)

    if filter_criteria:
        pets = pets.filter(filter_criteria)

    categ_serial = list(categories.values())
    pets_serial = list(pets.values())
    genders_serial = list(genders.values())

    cat_coats_serail = list(cat_coats.values())
    cat_breeds_serial = list(cat_breeds.values())

    context = {
        'categories': categ_serial,
        'cats': pets_serial,
        'genders': genders_serial,
        'selected_genders': cat_gender,
        'selected_coats': cat_coat,
        'selected_breeds': cat_breed,
        'cat_coats': cat_coats_serail,
        'cat_breeds': cat_breeds_serial,
    }

    return JsonResponse(context)


def dog_category(request):
    categories = Catalog.objects.all()
    pets = Pets.objects.filter(type='dog')
    genders = Gender.objects.all()

    dog_sizes = Size.objects.all()
    dog_breeds = Breed.objects.all()
    dog_coats = Coat.objects.all()

    dog_size = request.GET.getlist('dog-size')
    dog_coat = request.GET.getlist('dog-coat')
    dog_breed = request.GET.getlist('dog-breed')
    dog_gender = request.GET.getlist('dog-gender')

    filter_criteria = Q()

    if dog_gender:
        filter_criteria &= Q(gender__name__in=dog_gender)
    if dog_size:
        filter_criteria &= Q(size__name__in=dog_size)
    if dog_breed:
        filter_criteria &= Q(breed__name__in=dog_breed)
    if dog_coat:
        filter_criteria &= Q(coat__name__in=dog_coat)

    if filter_criteria:
        pets = pets.filter(filter_criteria)

    category_serial = list(categories.values())
    pets_serial = list(pets.values())
    genders_serial = list(genders.values())

    dog_sizes_serail = list(dog_sizes.values())
    dog_coats_serial = list(dog_coats.values())
    dog_breeds_serial = list(dog_breeds.values())

    context = {
        'categories': category_serial,
        'dogs': pets_serial,
        'genders': genders_serial,
        'dog_coats': dog_coats_serial,
        'dog_breeds': dog_breeds_serial,
        'dog_sizes': dog_sizes_serail,
        'selected_coat': dog_coat,
        'selected_breed': dog_breed,
        'selected_gender': dog_gender,
        'selected_size': dog_size,
    }

    return JsonResponse(context)


def rabbit_category(request):
    categories = Catalog.objects.all()
    pets = Pets.objects.filter(type='rabbit')
    genders = Gender.objects.all()

    rabbit_furs = Fur.objects.all()
    rabbit_colors = Color.objects.all()

    rabbit_gender = request.GET.getlist('rabbit-gender')
    rabbit_fur = request.GET.getlist('rabbit-fur')
    rabbit_color = request.GET.getlist('rabbit-color')

    filter_criteria = Q()

    if rabbit_gender:
        filter_criteria &= Q(gender__name__in=rabbit_gender)
    if rabbit_fur:
        filter_criteria &= Q(fur__name__in=rabbit_fur)
    if rabbit_color:
        filter_criteria &= Q(color__name__in=rabbit_color)

    if filter_criteria:
        pets = pets.filter(filter_criteria)

    categories_serial = list(categories.values())
    pets_serial = list(pets.values())
    genders_serial = list(genders.values())

    rabbit_furs_serial = list(rabbit_furs.values())
    rabbit_colors_serial = list(rabbit_furs.values())

    context = {
        'rabbits': pets_serial,
        'categories': categories_serial,
        'rabbit_colors': rabbit_colors_serial,
        'genders': genders_serial,
        'rabbit_furs': rabbit_furs_serial,
        'selected_gender': rabbit_gender,
        'selected_fur': rabbit_fur,
        'selected_color': rabbit_color,
    }

    return JsonResponse(context)


def product(request):
    products = PetProd.objects.all()
    product_type = 'petprod'

    prod_serial = list(products.values())

    context = {
        'prods': prod_serial,
        'product_type': product_type,
    }

    return JsonResponse(context)


def for_pets(request, prod_id):
    product = get_object_or_404(PetProd, id=prod_id)
    user_rating = None
    product_type = 'petprod'
    form_data = {}

    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():
            review, created = ProductReview.objects.update_or_create(
                user=request.user,
                product=product,
                defaults={'rating': form.cleaned_data['rating']}
            )
            user_rating = review.rating
            form_data = {
                'rating': review.rating
            }

    else:
        form = RatingForm()

    user_review = ProductReview.objects.filter(
        user=request.user, product=product).first()
    if user_rating:
        user_rating = user_review.rating

    reviews = ProductReview.objects.filter(product=product)

    product_serial = {
        'id': product.id,
        'category': product.category.name,
        'name': product.name,
        'avaible': product.avaible,
        'stock': product.stock,
        'price': product.price,
        'description': product.description,
        'image': product.image.url
    }

    reviews_serial = list(reviews.values())

    context = {
        'form': form_data,
        'product': product_serial,
        'user_rating': user_rating,
        'avarage_rating': product.avarage_rating(),
        'product_type': product_type,
        'reviews': reviews_serial,
    }

    return JsonResponse(context)


def product_detail(request, id):
    pets = Pets.objects.filter(id=id, avaible=True).first()
    product_type = 'pets'

    if not pets:
        print('nothing')

    pets_serial = {
        'id': pets.id,
        'name': pets.name,
        'price': pets.price,
        'description': pets.description,
        'images': pets.images.url,
        'category': pets.category.name,
        'avaible': pets.avaible,
        'gender': pets.gender.name,
        'fur': pets.fur.name if pets.fur else None,
        'color': pets.color.name if pets.color else None,
        'breed': pets.breed.name if pets.breed else None,
        'coat': pets.coat.name if pets.coat else None,
        'size': pets.size.name if pets.size else None
    }

    context = {
        'product': pets_serial,
        'product_type': product_type,
    }

    return JsonResponse(context)


def search_shop(request):
    query = request.GET.get('query', '')

    pets = Pets.objects.filter(Q(name__icontains=query))

    pets_serial = list(pets.values())

    context = {
        'pets': pets_serial,
    }

    return JsonResponse(context)


def contact_us(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            form_check = {
                'first_name': form.cleaned_data.get('first_name', ''),
                'email': form.cleaned_data.get('email', ''),
                'message': form.cleaned_data.get('message', ''),
            }
            form_data = {
                'is_valid': True,
                'errors': None,
                'cleaned_data': form_check
            }
            return JsonResponse(form_data)
        else:
            errors = {
                'form_check_error': form.errors.as_json()
            }
            return JsonResponse(errors)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def comments(request, prod_id):
    logger.debug("Processing comments view")

    token = request.headers.get('Authorization')

    if token and token.startswith('Bearer '):
        token = token[7:]
        user = decode_jwt(token)
        logger.debug(f"Authenticated User: {user}")
    else:
        logger.error("Token is missing or does not start with 'Bearer '")
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    if not user:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    product = get_object_or_404(PetProd, id=prod_id)
    comments = ProdComment.objects.filter(product=product).order_by('-published_date')

    if request.method == 'POST':
        comments_form = CommentForm(request.POST)
        if comments_form.is_valid():
            comment = comments_form.save(commit=False)
            comment.published_date = now()
            comment.product = product
            comment.user = user
            comment.save()

            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }

            comments_data = {
                'id': comment.id,
                'user': user_data,
                'published_date': comment.published_date.isoformat(),
                'product_id': comment.product.id,
                'text': comment.text,
            }

            return JsonResponse(comments_data)
        else:
            errors = {
                'errors': comments_form.errors.as_json()
            }
            return JsonResponse(errors)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_product_comments(request, prod_id):
    product = get_object_or_404(PetProd, id=prod_id)
    comments = ProdComment.objects.filter(
        product=product).order_by('-published_date')

    context = {
        'comments': list(comments.values()),
    }

    return JsonResponse(context)
