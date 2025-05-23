from rest_framework import serializers
from .models import Session, Seat, Booking, Theatre, Genre
from django.contrib.auth.models import User


class TheatreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    theatre = TheatreSerializer()
    genre = GenreSerializer()

    class Meta:
        model = Session
        fields = ('id', 'title', 'picture', 'theatre', 'genre', 'description', 'date_time', 'duration', 'price')


class SeatSerializer(serializers.ModelSerializer):
    theatre = TheatreSerializer()

    class Meta:
        model = Seat
        fields = ('id', 'theatre', 'row', 'number')


class BookingReadSerializer(serializers.ModelSerializer):
    session = SessionSerializer()
    seat = SeatSerializer()
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'

class BookingWriteSerializer(serializers.ModelSerializer):
    session = serializers.PrimaryKeyRelatedField(queryset=Session.objects.all())
    seat = serializers.PrimaryKeyRelatedField(queryset=Seat.objects.all())

    class Meta:
        model = Booking
        fields = ('session', 'seat')
        read_only_fields = ('user', 'booking_date', 'is_paid')

    def validate(self, data):
        if Booking.objects.filter(session=data['session'], seat=data['seat']).exists():
            raise serializers.ValidationError("Это место уже забронировано")
        return data


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user