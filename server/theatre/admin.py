from django.contrib import admin
from .models import Session, Seat, Booking, Theatre, Genre


class BookingInline(admin.TabularInline):
    model = Booking
    extra = 0
    readonly_fields = ('booking_date',)
    can_delete = True


class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class TheatreAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'capacity')
    search_fields = ('name', 'address')


class SessionAdmin(admin.ModelAdmin):
    list_display = ('title', 'picture', 'theatre', 'genre', 'date_time', 'duration', 'price')
    list_filter = ('date_time', 'theatre', 'genre')
    search_fields = ('title', 'description')
    inlines = [BookingInline]


class SeatAdmin(admin.ModelAdmin):
    list_display = ('theatre', 'row', 'number')
    list_filter = ('row',)
    search_fields = ('row', 'number')


class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'session', 'seat', 'booking_date', 'is_paid')
    list_filter = ('session', 'booking_date', 'is_paid')
    search_fields = ('user__username', 'session__title')
    readonly_fields = ('booking_date',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)


admin.site.register(Genre, GenreAdmin)
admin.site.register(Theatre, TheatreAdmin)
admin.site.register(Session, SessionAdmin)
admin.site.register(Seat, SeatAdmin)
admin.site.register(Booking, BookingAdmin)