from django.shortcuts import render
import flightBAS.models as fb


def flight_analitics(request):
    flights = fb.Flight.objects.filter(owner=request.user)
    context = {"flights": flights}
    return render(request, "analytics/FlightAnalitics.html", context)
