from django.contrib import admin
from django.urls import path
from Airmap import settings
from django.conf.urls.static import static
import flightBAS.views
import regBAS.views
import analytics.views
import users.views
from django.contrib.auth import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('flight/', flightBAS.views.airmap_map, name = 'flight'),
    path("home/", users.views.home_page, name = 'homepage'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('registrationBPLA/', regBAS.views.RegistrationBPLA.as_view(), name='BPLA_reg'),
    path('flightAnalytics/<int:id>/', analytics.views.flight_analytics, name='flight_analytics'),
    path('flightAnalytics/', analytics.views.general_analytics, name='general_analytics'),
    path('profile/', users.views.profile, name='profile'),
    path('api/createflight/', flightBAS.views.api_create_flight, name='create_flight_api'),
    path('api/generator/', flightBAS.views.send_coords, name='generator'),
    path('generator/', flightBAS.views.generator_html, name='generatorHTML'),
    path('api/coords/', flightBAS.views.api_show_drones, name='ShowCoordsDrones')

]+ static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()