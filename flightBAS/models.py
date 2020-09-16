from django.db import models
from django.contrib.auth.models import User
from regBAS.models import Bas
import jsonfield


class Flight(models.Model):

    owner               = models.ForeignKey(User, on_delete = models.CASCADE)
    dron                = models.ForeignKey(Bas, on_delete = models.CASCADE)
    start_flight        = models.DateTimeField(null = True)
    end_flight          = models.DateTimeField(null = True)
    polygon             = jsonfield.JSONField()
    condition_weather   = models.CharField(max_length=64)
    temperature_weather = models.FloatField()
    speed_wind          = models.FloatField()
    gusting             = models.FloatField()
    heading             = models.FloatField()
    visibility          = models.FloatField()
    dew_point           = models.FloatField()

    def __str__(self):
        return str(self.owner.username)

    class Meta:
        verbose_name = 'Полет'
        verbose_name_plural = 'Полеты'


