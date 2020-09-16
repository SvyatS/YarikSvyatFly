from django.shortcuts import render
from django.http import HttpResponse
import regBAS.models as rb
from .models import *
import json
from datetime import datetime


def airmap_map(request):
    BPLA = rb.Bas.objects.filter(owner=request.user)
    context = {"BPLA": BPLA}
    return render(request, "flightBAS/AirMapFlight.html", context)

def api_create_flight(request):
	if request.method == "POST":
		json_data = json.loads(request.body)

		bpla_id = int(json_data['BPLA'])

		start_time = json_data['start_flight']
		start_time = datetime.fromtimestamp(start_time / 1000.0)

		end_time = json_data['end_flight']
		end_time = datetime.fromtimestamp(end_time / 1000.0)
		polygon  = json_data['polygon']

		condition_weather   = json_data['condition_weather']
		temperature_weather = float(json_data['temperature_weather'])
		visibility          = float(json_data['visibility'])
		dew_point			= float(json_data['dew_point'])

		speed_wind          = float(json_data['speed_wind'])
		gusting             = float(json_data['gusting'])
		heading             = float(json_data['heading'])

		dron = rb.Bas.objects.get(id = bpla_id)

		Flight.objects.create(
				owner = request.user,
				dron = dron,
				start_flight = start_time,
				end_flight = end_time,
				polygon = polygon,
				condition_weather = condition_weather,
				temperature_weather = temperature_weather,
				speed_wind = speed_wind,
				gusting = gusting,
				heading = heading,
				visibility = visibility,
				dew_point = dew_point
			)
		return HttpResponse("Полет сохранен")
	#	Flight.objects.create()
