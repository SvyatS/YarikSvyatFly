from django.shortcuts import render
import flightBAS.models as fb


def flight_analytics(request, id):
	flight = fb.Flight.objects.get(id = id)
	context = {"flight": flight}
	return render(request, "analytics/analytics.html", context)

def general_analytics(request):
	flights = fb.Flight.objects.filter(owner=request.user)
	context = {"flights": flights}
	return render(request, "analytics/FlightAnalitics.html", context)
