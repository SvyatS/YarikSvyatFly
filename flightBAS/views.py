from django.shortcuts import render
from django.http import HttpResponse
import regBAS.models as rb
from .models import *


def airmap_map(request):
    BPLA = rb.Bas.objects.filter(owner=request.user)
    context = {"BPLA": BPLA}
    return render(request, "flightBAS/AirMapFlight.html", context)

def api_create_flight(request):
	if request.method == "POST":
		return HttpResponse("AYE")
	#	Flight.objects.create()
