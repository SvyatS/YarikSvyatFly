from django.shortcuts import render
import regBAS.models as rb


def home_page(request):
    return render(request, "users/home.html")

def profile(request):
    BPLA = rb.Bas.objects.filter(owner = request.user)
    context = {"BPLA": BPLA}
    return render(request, "users/profile.html", context)