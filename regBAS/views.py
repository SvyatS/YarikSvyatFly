from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .forms import *


class RegistrationBPLA(View):
    def get(self, request):
        form = RegistrationBPLAForm()
        return render(request, "regBAS/regBPLA.html", {"form": form})

    def post(self, request):
        form = RegistrationBPLAForm(request.POST, request.FILES)
        if form.is_valid():
            owner = request.user
            type = form.cleaned_data.get("type")
            classification = form.cleaned_data.get("classification")
            weight = form.cleaned_data.get("weight")
            photo = form.cleaned_data.get("photo")
            obj = Bas.objects.create(
                owner = owner,
                type = type,
                classification = classification,
                weight = weight,
                photo = photo,
                verification = "На проверке",
            )
            obj.save()
            return HttpResponse("<h4>Заявление на рассмотрении</h4>")
        else:
            form = RegistrationBPLAForm()
        return render(request, "regBAS/regBPLA.html", {"form": form})
