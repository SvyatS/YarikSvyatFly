from django.shortcuts import render
import regBAS.models as rb


def airmap_map(request):
    BPLA = rb.Bas.objects.filter(owner=request.user)
    context = {"BPLA": BPLA}
    return render(request, "flightBAS/AirMapFlight.html", context)

