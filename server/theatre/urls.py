from django.urls import path
from .views import (
    SessionListView,
    SessionDetailView,
    SeatAvailabilityView,
    UserBookingsView,
    TheatreListView,
    GenreListView,
    BookingCreateView
)

urlpatterns = [
    path('sessions/', SessionListView.as_view(), name='session-list'),
    path('theatres/', TheatreListView.as_view(), name='theatre-list'),
    path('genres/', GenreListView.as_view(), name='genre-list'),
    path('sessions/<int:pk>/', SessionDetailView.as_view(), name='session-detail'),
    path('sessions/<int:session_id>/seats/', SeatAvailabilityView.as_view(), name='seat-availability'),
    path('bookings/create/', BookingCreateView.as_view(), name='booking-create'),
    path('user/bookings/', UserBookingsView.as_view(), name='user-bookings'),
]