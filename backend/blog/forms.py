from django import forms
from django.forms.models import inlineformset_factory, modelformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Post, PostImage, Profile, Adress, Comments, Like


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ('published_date', 'user', 'likes')
        
class PostImageForm(forms.ModelForm):
    class Meta:
        model = PostImage
        fields = ['image',]
        
ImageFormSet = modelformset_factory(PostImage, form=PostImageForm, extra=5)

class CommentsForm(forms.ModelForm):
    class Meta:
        model = Comments
        exclude = ('published_date', 'user', 'post',)

class UserRegister(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2',]
        
class RegisterForm(forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ('user',)
        
class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email',]
        
class ProfileUpdate(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['telephone', 'country', 'city',]
        
class AvatarForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'background_pic',]
        
class AdressForm(forms.ModelForm):
    class Meta: 
        model = Adress
        fields = ['street', 'private_house_number', 'entrance_number', 'flat_num',]
        
AdressFormSet = inlineformset_factory(Profile, Adress, form=AdressForm, extra=0, can_delete= True)
        