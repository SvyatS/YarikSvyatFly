from django.contrib import admin
from django.urls import path
from Airmap import settings
from django.conf.urls.static import static
import flightBAS.views
import regBAS.views
import users.views
from django.contrib.auth import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('flight/', flightBAS.views.airmap_map, name = 'flight'),
    path("home/", users.views.home_page),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('registrationBPLA/', regBAS.views.RegistrationBPLA.as_view(), name='BPLA_reg'),
    path('flightAnalytics/', flightBAS.views.flight_analitics, name='flight_analytics'),
    path('profile/', users.views.profile, name='profile'),

]+ static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
