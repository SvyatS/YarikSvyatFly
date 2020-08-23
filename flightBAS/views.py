from django.shortcuts import render


def airmap_map(request):
    return render(request, "flightBAS/AirMapFlight.html")

def flight_analitics(request):
    return render(request, "flightBAS/FlightAnalitics.html")
