from django.shortcuts import render
import regBAS.models as rb
from .models import *


def airmap_map(request):
    BPLA = rb.Bas.objects.filter(owner=request.user)
    context = {"BPLA": BPLA}
    return render(request, "flightBAS/AirMapFlight.html", context)

def api_create_flight(request):
	pass
	#	Flight.objects.create()
