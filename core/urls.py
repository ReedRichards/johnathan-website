from django.conf.urls import url

from . import views

app_name = 'core'


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^portfolio/$', views.portfolio, name='portfolio'),
    url(r'^reviews/$', views.reviews, name='reviews'),
    url(r'^services/$', views.services, name='services'),
    url(r'^portfolio/warehouse/$', views.warehouse, name='warehouse'),
    url(r'^portfolio/office/$', views.office, name='office'),
    url(r'^portfolio/building/$', views.building, name='building'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^thanks/$', views.thanks, name='thanks'),
    url(r'^about/$', views.about, name='about'),
    url(r'^testimonials/$', views.testimonials, name='testimonials'),
    ]
