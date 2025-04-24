from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .filters import SessionFilter
from .models import (
    Session,
    Seat,
    Booking,
    Theatre,
    Genre
)
from .serializers import (
    SessionSerializer,
    TheatreSerializer,
    GenreSerializer,
    BookingReadSerializer,
    BookingWriteSerializer
)
from rest_framework import filters as rest_filters

class TheatreListView(generics.ListAPIView):
    queryset = Theatre.objects.all()
    serializer_class = TheatreSerializer


class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class SessionListView(generics.ListAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    filter_backends = [DjangoFilterBackend, rest_filters.SearchFilter, rest_filters.OrderingFilter]
    filterset_class = SessionFilter
    search_fields = ['title', 'description']
    ordering_fields = ['date_time', 'price', 'title']
    ordering = ['date_time']


class SessionDetailView(generics.RetrieveAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SeatAvailabilityView(APIView):
    @staticmethod
    def get(request, session_id):
        session = get_object_or_404(Session, id=session_id)
        seats = Seat.objects.all()
        seats_data = []
        for seat in seats:
            is_booked = Booking.objects.filter(session=session, seat=seat).exists()
            seats_data.append({
                'id': seat.id,
                'row': seat.row,
                'number': seat.number,
                'is_available': not is_booked
            })
        return Response(seats_data)


class UserBookingsView(generics.ListAPIView):
    serializer_class = BookingReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).select_related(
            'session__theatre',
            'session__genre',
            'seat__theatre'
        )


class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingWriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)