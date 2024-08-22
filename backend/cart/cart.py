from decimal import Decimal
from django.conf import settings
from shop.models import Pets, PetProd

class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, product, quantity=1, update_quantity=False):
        if isinstance(product, Pets):
            product_type = 'pets'
        elif isinstance(product, PetProd):
            product_type = 'petprod'
        else:
            raise ValueError("Unsupported product type")
        
        product_id = f"{product_type}-{product.id}"

        if product_id not in self.cart:
            self.cart[product_id] = {
                'quantity': 0,
                'price': str(product.price)
            }
        
        if update_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity
            
        self.save()

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, product):
        if isinstance(product, Pets):
            product_type = 'pets'
        elif isinstance(product, PetProd):
            product_type = 'petprod'
        else:
            raise ValueError("Unsupported product type")

        product_id = f"{product_type}-{product.id}"
        
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        for product_id, item in self.cart.items():
            product_type, actual_id = product_id.split('-')
            if product_type == 'pets':
                product = Pets.objects.get(id=actual_id)
            elif product_type == 'petprod':
                product = PetProd.objects.get(id=actual_id)
            else:
                continue  # Skip unknown product types
            
            yield {
                'product_type': product_type,
                'product': product,
                'quantity': item['quantity'],
                'price': Decimal(item['price']),
                'total_price': Decimal(item['price']) * item['quantity'],
            }

    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())

    def get_total_price(self):
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True