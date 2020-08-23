from django.shortcuts import render


def airmap_map(request):
    return render(request, "flightBAS/AirMapFlight.html")
