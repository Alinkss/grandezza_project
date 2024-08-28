from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from shop.models import Pets, PetProd
from .cart import Cart
from .forms import CartAddForm


def cart_add(request, product_id, product_type):
    cart = Cart(request)
    
    context = {}
    
    if product_type == 'pets':
        product = get_object_or_404(Pets, id=product_id)
        coat_serial = {
            'name': product.color.name if product.color else None
        }
    
        breed_serial = {
            'name': product.breed.name if product.breed else None
        }
    
        size_serial = {
            'name': product.size.name if product.size else None
        }
    
        fur_serial = {
            'name': product.fur.name if product.fur else None
        }
    
        color_serial = {
            'name': product.color.name if product.color else None
        }
        pet_serial = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'category': product.category.name,
            'avaible': product.avaible,
            'gender': product.gender.name if product.gender.name else None,
            'fur': fur_serial,
            'color': color_serial,
            'coat': coat_serial,
            'breed': breed_serial,
            'size': size_serial,
            'images': product.images.url if product.images.url else ''
        }
        
        context['product'] = pet_serial
    else:
        product = get_object_or_404(PetProd, id=product_id)
        petprod_serial = {
            'category': product.category.name,
            'name': product.name,
            'avaible': product.avaible,
            'stock': product.stock,
            'price': product.price,
            'descroption': product.description,
            'image': product.image.url if product.image.url else ''
        }
        context['product'] = petprod_serial
        
    
    
    form = CartAddForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product, quantity=cd['quantity'], update_quantity=cd['update'])
        context['form'] = {
            'is_valid': True,
            'cleaned_data': cd
        }
    else:
        print("Form is not valid.")
        print(form.errors)
        
    return JsonResponse(context)


def cart_detail(request):
    cart = Cart(request)
    cart_items = []
    for item in cart:
        cart_items.append({
            'product_id': item['product'].id,
            'product_type': item['product_type'],
            'name': item['product'].name,
            'price': str(item['price']),
            'quantity': item['quantity'],
            'total_price': str(item['total_price']),
            'image_url': item['product'].images.url if hasattr(item['product'], 'images') else ''
        })
        
    context = {
        'cart_items': cart_items,
        'total_price': str(cart.get_total_price()),
    }
    
    return JsonResponse(context)

def cart_remove(request, product_id, product_type):
    cart = Cart(request)
    
    context = {}
    
    if product_type == 'pets':
        product = get_object_or_404(Pets, id=product_id)
        coat_serial = {
            'name': product.color.name if product.color else None
        }
    
        breed_serial = {
            'name': product.breed.name if product.breed else None
        }
    
        size_serial = {
            'name': product.size.name if product.size else None
        }
    
        fur_serial = {
            'name': product.fur.name if product.fur else None
        }
    
        color_serial = {
            'name': product.color.name if product.color else None
        }
        pet_serial = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'category': product.category.name,
            'avaible': product.avaible,
            'gender': product.gender.name if product.gender.name else None,
            'fur': fur_serial,
            'color': color_serial,
            'coat': coat_serial,
            'breed': breed_serial,
            'size': size_serial,
            'images': product.images.url if product.images.url else ''
        }
        
        context['product'] = pet_serial
    else:
        product = get_object_or_404(PetProd, id=product_id)
        petprod_serial = {
            'category': product.category.name,
            'name': product.name,
            'avaible': product.avaible,
            'stock': product.stock,
            'price': product.price,
            'descroption': product.description,
            'image': product.image.url if product.image.url else ''
        }
        context['product'] = petprod_serial
    
    cart.remove(product)
    
    cart_items = []
    for item in cart:
        cart_items.append({
            'product_id': item['product'].id,
            'product_type': item['product_type'],
            'name': item['product'].name,
            'price': str(item['price']),
            'quantity': item['quantity'],
            'total_price': str(item['total_price']),
            'image_url': item['product'].images.url if hasattr(item['product'], 'images') else ''
        })

    context['cart_items'] = cart_items
    context['total_price'] = str(cart.get_total_price())
    
    return JsonResponse(context)
