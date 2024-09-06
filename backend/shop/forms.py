from django import forms
from shop.models import ContactUs, ProductReview, ProdComment


class ContactUsForm(forms.ModelForm):
    class Meta:
        model = ContactUs
        fields = ['first_name', 'email', 'message',]


class RatingForm(forms.ModelForm):
    class Meta:
        model = ProductReview
        fields = ['rating',]
        widgets = {
            'rating': forms.RadioSelect(choices=[(i, f"{i} Stars") for i in range(1, 6)]),
        }


class CommentForm(forms.ModelForm):
    class Meta:
        model = ProdComment
        fields = ['text',]
