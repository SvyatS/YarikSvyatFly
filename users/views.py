from django.shortcuts import render


def home_page(request):
    return render(request, "users/home.html")

def profile(request):
    return render(request, "users/profile.html")