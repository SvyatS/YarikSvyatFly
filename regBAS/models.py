from django.db import models
from django.contrib.auth.models import User


class Bas(models.Model):

    types = (
        ("С жестким крылом", "С жестким крылом"),
        ("С гибким крылом", "С гибким крылом"),
        ("С вращающимся крылом", "С вращающимся крылом"),
        ("С машущим крылом", "С машущим крылом"),
        ("Аэростатические", "Аэростатические")
    )

    classifications = (
        ("Микро-мини", "Микро-мини"),
        ("Лёгкий малого радиуса", "Лёгкий малого радиуса"),
        ("Лёгкий среднего радиуса", "Лёгкий среднего радиуса"),
        ("Средний", "Средний"),
        ("Средне-тяжелый", "Средне-тяжелый"),
        ("Тяжелый среднего радиуса", "Тяжелый среднего радиуса"),
        ("Тяжелый с продолжительным полетом", "Тяжелый с продолжительным полетом"),
        ("Боевой", "Боевой")
    )

    verify = (
        ("На проверке", "На проверке"),
        ("Верифирован", "Верифирован"),
        ("Отказ", "Отказ")
    )

    owner = models.ForeignKey(User, on_delete = models.CASCADE)
    type = models.CharField("Тип БПЛА", choices = types, max_length = 64)
    classification = models.CharField("Класс БПЛА", choices = classifications, max_length = 64)
    weight = models.FloatField("Вес БПЛА")
    photo = models.ImageField(upload_to='BPLA_images')
    verification = models.CharField("Статус верификации", choices = verify, max_length = 64)

    def __str__(self):
        return str(self.owner.username + ': ' + self.classification + ' БПЛА')

    class Meta:
        verbose_name = 'БПЛА'
        verbose_name_plural = 'БПЛА'