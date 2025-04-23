import { defineStore } from "pinia";
import { ref } from "vue";
import type { Booking } from "@/types";
import {createBooking, getBookings} from "@/services/bookingService.ts";

export const useDictionaryStore = defineStore('bookings', () => {
    const bookings = ref<Booking[]>([]);

    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchBookings = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            bookings.value = await getBookings();
        } catch (err) {
            error.value = 'Ошибка при загрузке брони';
            console.error('Ошибка при загрузке брони:', err);
            throw err;
        }
    }

    const addBooking = async (sessionId: number, seatId: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            if (isBooked(sessionId, seatId)) {
                console.warn('Место уже забронированно');
                return;
            }

            await createBooking(sessionId, seatId);
            await fetchBookings();
        } catch (err) {
            console.error('Ошибка при бронировании:', err);
            throw err;
        }
    };

    const isBooked = (sessionId: number, seatId: number) => {
        return bookings.value.some(b =>
            b.session.id === sessionId &&
            b.seat.id === seatId
        );
    };

    return {
        bookings,
        isLoading,
        error,
        fetchBookings,
        addBooking,
        isBooked
    }
});