import type { Booking } from "@/types";
import { API_URL } from "@/services/baseURL";
import axios from "axios";

export const getBookings = async (): Promise<Booking[]> => {
    try {
        const response = await axios.get<Booking[]>(`${API_URL}/user/bookings/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        throw error;
    }
};

export const createBooking = async (sessionId: number, seatId: number): Promise<Booking> => {
    try {
        const response = await axios.post<Booking>(
            `${API_URL}/bookings/create/`,
            {
                session: sessionId,
                seat: seatId
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании бронирования:', error);
        throw error;
    }
};