from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse

from .models import Catalog, Pets, Breed, Coat, Size, Color, Fur, Gender, ContactUs, PetProd, ProductReview
from shop.forms import ContactUsForm, RatingForm


from django.db.models import Q

def main(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('main')
        else:
            print(form.errors)
    else:     
        form = ContactUsForm()
    
    context = {
        'form': form.as_p(),
    }
    
    return JsonResponse(context)

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
    pets = Pets.objects.filter(type = 'cat')
    genders = Gender.objects.all()
    
    cat_coats = Coat.objects.all()
    cat_breeds = Breed.objects.all() 
        
    cat_gender = request.GET.getlist('cat-gender')
    cat_coat = request.GET.getlist('cat-coat')
    cat_breed = request.GET.getlist('cat-breed')
    
    filter_criteria = Q()
    
    if cat_gender:
        filter_criteria &= Q(gender__name__in = cat_gender)
    if cat_coat:
        filter_criteria &= Q(coat__name__in = cat_coat)
    if cat_breed:
        filter_criteria &= Q(breed__name__in = cat_breed)
    
    if filter_criteria:
        pets = pets.filter(filter_criteria)
        
    context = {
        'categories': categories,
        'cats': pets,
        'genders': genders,
        'selected_genders': cat_gender,
        'selected_coats': cat_coat,
        'selected_breeds': cat_breed,
        'cat_coats': cat_coats,
        'cat_breeds': cat_breeds,
    }
        
    return render(request, 'shop/cat_category.html', context)

def dog_category(request):
    categories = Catalog.objects.all()
    pets = Pets.objects.filter(type = 'dog')
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
        filter_criteria &= Q(gender__name__in = dog_gender)
    if dog_size:
        filter_criteria &= Q(size__name__in = dog_size)
    if dog_breed:
        filter_criteria &= Q(breed__name__in = dog_breed)
    if dog_coat:
        filter_criteria &= Q(coat__name__in = dog_coat)
    
    if filter_criteria:
        pets = pets.filter(filter_criteria)
        
    context = {
        'categories': categories,
        'dogs': pets,
        'genders': genders,
        'dog_coats': dog_coats,
        'dog_breeds': dog_breeds,
        'dog_sizes': dog_sizes,
        'selected_coat': dog_coat,
        'selected_breed': dog_breed,
        'selected_gender': dog_gender,
        'selected_size': dog_size,
    }
    
    return render(request, 'shop/dog_category.html', context)

def rabbit_category(request):
    categories = Catalog.objects.all()
    pets = Pets.objects.filter(type = 'rabbit')
    genders = Gender.objects.all()
    
    rabbit_furs = Fur.objects.all()
    rabbit_colors = Color.objects.all()
    
    rabbit_gender = request.GET.getlist('rabbit-gender')
    rabbit_fur = request.GET.getlist('rabbit-fur')
    rabbit_color = request.GET.getlist('rabbit-color')
    
    filter_criteria = Q()
    
    if rabbit_gender:
        filter_criteria &= Q(gender__name__in = rabbit_gender)
    if rabbit_fur:
        filter_criteria &= Q(fur__name__in = rabbit_fur)
    if rabbit_color:
        filter_criteria &= Q(color__name__in = rabbit_color)
        
    if filter_criteria:
        pets = pets.filter(filter_criteria)
        
    context = {
        'rabbits': pets,
        'categories': categories,
        'rabbit_colors': rabbit_colors,
        'genders': genders,
        'rabbit_furs': rabbit_furs,
        'selected_gender': rabbit_gender,
        'selected_fur': rabbit_fur,
        'selected_color': rabbit_color,
    }
    
    return render(request, 'shop/rabbit_category.html', context)

def product(request):
    products = PetProd.objects.all()
    product_type = 'petprod'
    
    context = {
        'prods': products,
        'product_type': product_type,
    }
    
    return render(request, 'shop/prods.html', context)


def for_pets(request, prod_id):
    product = get_object_or_404(PetProd, id=prod_id)
    user_rating = None
    product_type = 'petprod'
    
    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():
            ProductReview.objects.update_or_create(
                user=request.user,
                product=product,
                defaults={'rating': form.cleaned_data['rating']}
            )
            # return redirect('product_detail', id=prod_id)
    else:
        form = RatingForm()
        
    reviews = ProductReview.objects.filter(product=product)
    
    context = {
        'form': form,
        'product': product,
        'user_rating': user_rating,
        'avarage_rating': product.avarage_rating(),
        'product_type': product_type,
        'reviews':reviews,
    }
    
    return render(request, 'shop/product/for_pet.html', context)

        
def product_detail(request, id):
    pets =  Pets.objects.filter(id=id, avaible=True).first()
    product_type = 'pets'
    
    if not pets:
        print('nothing')

    context = {
        'product': pets,
        'product_type': product_type,
    }       
    
    return render(request, 'shop/product/detail.html', context)

def search_shop(request):
    query = request.GET.get('query', '')
    
    pets = Pets.objects.filter(Q(name__icontains = query))
    
    context = {
        'pets': pets,
    }
    
    return render(request, 'shop/catalog.html', context)

def contact_us(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('main')
        else:
            print(form.errors)
    else:     
        form = ContactUsForm()
    
    context = {
        'form': form,
    }
    
    return render(request, 'shop/main.html', context)


