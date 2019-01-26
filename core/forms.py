from django import forms

class ContactForm(forms.Form):
    auto_id=False
    name = forms.CharField(max_length=128, label="",widget=forms.TextInput(attrs={'id':'name','placeholder':"name",}))
    email = forms.EmailField(max_length=128,label="",widget=forms.TextInput(attrs={'id':'email','placeholder':"email"}))
    number = forms.CharField(max_length=128, label="",widget=forms.TextInput(attrs={'id':'number','placeholder':"phone number",}))
    CHOICES = (('residential','residential'),('commercial','commercial'))
    select = forms.ChoiceField(choices=CHOICES,label="",widget=forms.Select(attrs={'id':'select'}))
    description = forms.CharField(max_length=128,label="",widget=forms.Textarea(attrs={'id':'description','rows':'6','placeholder':'Description of project and any additional info'}))
