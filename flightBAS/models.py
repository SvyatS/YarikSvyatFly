from django.db import models
from django.contrib.auth.models import User
from regBAS.models import Bas


class Flight(models.Model):

    owner = models.ForeignKey(User, on_delete = models.CASCADE)
    dron = models.ForeignKey(Bas, on_delete = models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    start_point = models.CharField("Стартовая точка", max_length = 64)
    end_point = models.CharField("Конечная точка", max_length = 64)

    def __str__(self):
        return str(self.owner.username + ': ' + self.start_point + ' ' + self.end_point)

    class Meta:
        verbose_name = 'Полет'
        verbose_name_plural = 'Полеты'
