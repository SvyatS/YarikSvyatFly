from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse


class RegistrationBPLA(View):
    def get(self, request):
        return render(request, "regBAS/regBPLA.html")

    def post(self, request):
        return HttpResponse("<h4>Заявление на рассмотрении</h4>")
