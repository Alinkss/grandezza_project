from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from orders.models import Order, OrderItem
from cart.cart import Cart
from django.contrib.auth.models import User
from blog.models import Profile
from orders.forms import OrderCreatedForm, UserDontLoginForm

def order_created(request, user_id=None, product_type=None):
    cart = Cart(request)
    user = None
    profile = None
    
    if user_id:
        user = User.objects.get(id= user_id)
        profile = get_object_or_404(Profile, user = user)
        
    if request.method == 'POST':
        if user and user.is_authenticated:
            form = OrderCreatedForm(request.POST)
            if form.is_valid():
                order = form.save(commit=False)
                order.user = user
                order.profile = profile
                order.first_name = user.first_name
                order.last_name = user.last_name
                order.email = user.email
                order.save()
                
                user_data = {
                    'id': request.user.id,
                    'username': request.user.username
                }
                countries_serial = list(profile.country.values('id', 'name')) if profile.country.exists() else []
                cities_serial = list(profile.city.values('id', 'name')) if profile.city.exists() else []
               
                profile = {
                    'id': profile.id,
                    'telephone': profile.telephone,
                    'avatar': profile.avatar.url if profile.avatar else None,
                    'country': countries_serial,
                    'city': cities_serial,
                    'background_pic': profile.background_pic.url if profile.background_pic else None
                }
                
                order_items = []
                for item in cart.cart:
                    if isinstance(item, dict):
                        if product_type == 'pets':
                            product = item.get('pets')
                        else:
                            product = item.get('petprod')

                        if product:
                            order_item = OrderItem.objects.create(
                                order=order,
                                product=product,
                                price=item.get('price', 0), 
                                quantity=item.get('quantity', 1)
                            )
                            order_items.append({
                                'product': order_item.product.id,
                                'price': order_item.price,
                                'quantity': order_item.quantity
                            })
                        else:
                            print("Product not found in cart item:", item)
                
                order_form = {
                    'user': user_data,
                    'profile': profile,
                    'cart': order_items
                }
                    
                print("Cart before clear:", cart.cart)
                cart.clear()
                print("Cart after clear:", cart.cart)
                
                context = {
                    'order_form': {
                        'is_valid': True,
                        'errors': None,
                        'cleaned_data': order_form
                    }
                }
                print("Order saved")
                return JsonResponse(context)
            
        else:
                form_dont_login = UserDontLoginForm(request.POST)
                if form_dont_login.is_valid():
                    order = form_dont_login.save()
                    
                    order_items = []
                    for item in cart.cart:
                        if isinstance(item, dict):
                            if product_type == 'pets':
                                product = item.get('pets')
                            else:
                                product = item.get('petprod')

                            if product:
                                order_item = OrderItem.objects.create(
                                    order=order,
                                    product=product,
                                    price=item.get('price', 0), 
                                    quantity=item.get('quantity', 1)
                                )
                                order_items.append({
                                    'product': order_item.product.id,
                                    'price': order_item.price,
                                    'quantity': order_item.quantity
                                })
                            else:
                                print("Product not found in cart item:", item)
                        
                    print("Cart before clear:", cart.cart)
                    cart.clear()
                    print("Cart after clear:", cart.cart)
                    
                    context = {
                        'order': {
                            'id': order.id,
                            'items': order_items,
                            'status': 'Order created successfully'
                        }
                    }
                    print("Order saved")
                    return JsonResponse(context)
                else:
                    print(form_dont_login.errors)
    else:
        form = OrderCreatedForm() if user and user.is_authenticated else None
        form_dont_login = UserDontLoginForm() if not user or not user.is_authenticated else None
            
            
    context = {
        'error': 'Invalid request method',
        'method': request.method
    }
    return JsonResponse(context, status=400)
            
        
        
    
