from django.db import models
from django.contrib.auth.models import User


class Theatre(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    capacity = models.CharField(max_length=10)

    objects = models.Manager()

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=200)

    objects = models.Manager()

    def __str__(self):
        return self.name


class Session(models.Model):
    title = models.CharField(max_length=200)
    picture = models.CharField(max_length=1000)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    description = models.TextField()
    date_time = models.DateTimeField()
    duration = models.DurationField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    objects = models.Manager()

    def __str__(self):
        return self.title


class Seat(models.Model):
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    row = models.PositiveIntegerField()
    number = models.PositiveIntegerField()

    objects = models.Manager()

    class Meta:
        unique_together = ('row', 'number')

    def __str__(self):
        return f"Театр: {self.theatre.name}, Ряд {self.row}, Место {self.number}"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=True)

    objects = models.Manager()

    class Meta:
        unique_together = ('session', 'seat')

    def __str__(self):
        return f"{self.user.username} - {self.session.title}"