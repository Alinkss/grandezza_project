from django import forms
from shop.models import Pets

class CartAddForm(forms.Form):
    quantity = forms.IntegerField(
        initial=1,
        min_value=1,
        widget=forms.HiddenInput()
    )

    update = forms.BooleanField(required=False, 
                                initial=False, 
                                widget=forms.HiddenInput)
    
    