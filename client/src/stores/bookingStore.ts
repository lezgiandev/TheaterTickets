import { defineStore } from "pinia";
import { ref } from "vue";
import type { Booking } from "@/types";
import { createBooking, getBookings } from "@/services/bookingService.ts";

export const useBookingStore = defineStore('bookings', () => {
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
            const newBooking = await createBooking(sessionId, seatId);
            bookings.value.push(newBooking);
        } catch (err) {
            error.value = 'Ошибка при создании бронирования';
            console.error('Ошибка бронирования:', err);
            throw err;
        } finally {
            isLoading.value = false;
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
        addBooking,
        fetchBookings,
        isBooked
    }
});