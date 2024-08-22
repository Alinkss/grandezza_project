from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from shop.models import Pets, PetProd
from .cart import Cart
from .forms import CartAddForm


def cart_add(request, product_id, product_type):
    cart = Cart(request)
    
    if product_type == 'pets':
        product = get_object_or_404(Pets, id=product_id)
    elif product_type == 'petprod':
        product = get_object_or_404(PetProd, id=product_id)
    else:
        return redirect('cart_detail')
    
    form = CartAddForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product, quantity=cd['quantity'], update_quantity=cd['update'])
    else:
        print("Form is not valid.")
        print(form.errors)
        
    return redirect('cart_detail')


def cart_detail(request):
    cart = Cart(request)
    context = {
        'cart': cart,
    }
    
    return render(request, 'cart/detail.html', context)

def cart_remove(request, product_id, product_type):
    cart = Cart(request)
    
    if product_type == 'pets':
        product = get_object_or_404(Pets, id=product_id)
    elif product_type == 'petprod':
        product = get_object_or_404(PetProd, id=product_id)
    else:
        return redirect('cart_detail')
    
    cart.remove(product)
    
    return redirect('cart_detail')
