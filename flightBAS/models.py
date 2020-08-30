from django.db import models
from django.contrib.auth.models import User
from regBAS.models import Bas
import jsonfield


class Flight(models.Model):

    owner = models.ForeignKey(User, on_delete = models.CASCADE)
    dron = models.ForeignKey(Bas, on_delete = models.CASCADE)
    start_flight = models.DateTimeField(null = True)
    end_flight = models.DateTimeField(auto_now = True)
    polygon = jsonfield.JSONField()


    def __str__(self):
        return str(self.owner.username)

    class Meta:
        verbose_name = 'Полет'
        verbose_name_plural = 'Полеты'
