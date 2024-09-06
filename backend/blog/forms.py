from django import forms
from django.forms.models import inlineformset_factory, modelformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Post, PostImage, Profile, Adress, Comments, Like, Country, City


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
    avatar = forms.ImageField(required=False)
    background_pic = forms.ImageField(required=False)
    telephone = forms.CharField(max_length=25)
    country = forms.ModelMultipleChoiceField(
        queryset=Country.objects.all(),
        required=False,
        widget=forms.SelectMultiple
    )
    city = forms.ModelMultipleChoiceField(
        queryset=City.objects.all(),
        required=False,
        widget=forms.SelectMultiple
    )
    private_house_number = forms.IntegerField(required=False)
    entrance_number = forms.CharField(required=False)
    flat_num = forms.IntegerField(required=False)
    street = forms.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name',
                  'email', 'password1', 'password2',]

    def save(self, commit=False):
        user = super().save(commit=False)
        if commit:
            user.save()
            profile = Profile.objects.create(
                user=user,
                avatar=self.cleaned_data.get('avatar'),
                background_pic=self.cleaned_data.get('background_pic'),
                telephone=self.cleaned_data.get('telephone')
            )
            profile.country.set(self.cleaned_data.get('country'))
            profile.city.set(self.cleaned_data.get('city'))
            profile.save()

            Adress.objects.create(
                profile=profile,
                private_house_number=self.cleaned_data.get(
                    'private_house_number'),
                entrance_number=self.cleaned_data.get('entrance_number'),
                flat_num=self.cleaned_data.get('flat_num'),
                street=self.cleaned_data.get('street')
            )

        return user


class UserUpdateForm(forms.ModelForm):
    telephone = forms.CharField(max_length=25, required=False)
    country = forms.ModelMultipleChoiceField(
        queryset=Country.objects.all(),
        required=False
    )
    city = forms.ModelMultipleChoiceField(
        queryset=City.objects.all(),
        required=False
    )
    private_house_number = forms.IntegerField(required=False)
    entrance_number = forms.CharField(required=False)
    flat_num = forms.IntegerField(required=False)
    street = forms.CharField(required=False)
    avatar = forms.ImageField(required=False)
    background_pic = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        user = kwargs.get('instance')
        super().__init__(*args, **kwargs)

        if user:
            if hasattr(user, 'profile'):
                profile = user.profile
                self.fields['telephone'].initial = profile.telephone
                self.fields['avatar'].initial = profile.avatar
                self.fields['background_pic'].initial = profile.background_pic
                self.fields['country'].initial = profile.country.all()
                self.fields['city'].initial = profile.city.all()

                address = Adress.objects.filter(profile=profile).first()
                if address:
                    self.fields['street'].initial = address.street
                    self.fields['private_house_number'].initial = address.private_house_number
                    self.fields['entrance_number'].initial = address.entrance_number
                    self.fields['flat_num'].initial = address.flat_num

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()

            profile, _ = Profile.objects.get_or_create(user=user)
            profile.avatar = self.cleaned_data.get('avatar')
            profile.background_pic = self.cleaned_data.get('background_pic')
            profile.telephone = self.cleaned_data.get('telephone')
            profile.save()

            profile.country.set(self.cleaned_data.get('country'))
            profile.city.set(self.cleaned_data.get('city'))
            profile.save()

            address, _ = Adress.objects.get_or_create(profile=profile)
            address.private_house_number = self.cleaned_data.get(
                'private_house_number')
            address.entrance_number = self.cleaned_data.get('entrance_number')
            address.flat_num = self.cleaned_data.get('flat_num')
            address.street = self.cleaned_data.get('street')
            address.save()

        return user

# class ProfileUpdate(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = ['telephone', 'country', 'city',]


class AvatarForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'background_pic',]


class AdressForm(forms.ModelForm):
    class Meta:
        model = Adress
        fields = ['street', 'private_house_number',
                  'entrance_number', 'flat_num',]


AdressFormSet = inlineformset_factory(
    Profile, Adress, form=AdressForm, extra=0, can_delete=True)


class LoginForm(forms.Form):
    username = forms.CharField(max_length=200)
    password = forms.CharField(max_length=200, widget=forms.PasswordInput)


class JwtForm(forms.Form):
    token = forms.CharField(max_length=200)
