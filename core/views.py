from django.shortcuts import render,redirect
from django.conf import settings
from django.core.mail import send_mail

from .forms import ContactForm

# Create your views here.

def index(request):
    template = "core/index.html"
    context = {}
    return render(request,template,context)

def portfolio(request):
    template = "core/portfolio.html"
    context = {}
    return render(request,template,context)

def reviews(request):
    template = "core/reviews.html"
    context = {}
    return render(request,template,context)

def services(request):
    template = "core/services.html"
    context = {}
    return render(request,template,context)

def warehouse(request):
    template = "core/warehouse.html"
    context = {}
    return render(request,template,context)

def office(request):
    template = "core/office.html"
    context = {}
    return render(request,template,context)

def building(request):
    template = "core/building.html"
    context = {}
    return render(request,template,context)

def thanks(request):
    template = "core/thanks.html"
    context = {}
    return render(request,template,context)

def about(request):
    template = "core/about.html"
    context = {}
    return render(request,template,context)

def testimonials(request):
    template = "core/testimonials.html"
    context = {}
    return render(request,template,context)


def contact(request):
     # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = ContactForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required

            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            number = form.cleaned_data['number']
            select = form.cleaned_data['select']
            description = form.cleaned_data['description']
            message = '%s\n%s\n%s\n%s\n%s\n' %(name,number, email,select,description)
            emailTo = 'xxmrmau5@gmail.com'
            send_mail('contact from WPC',message,"rob",['johnathan@wpcdesigns.com','xxmrmau5@gmail.com'])


            # redirect to a new URL:
            return redirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = ContactForm(auto_id=False)

    template = "core/contact.html"
    context = {'form' : form}
    return render(request,template,context)
