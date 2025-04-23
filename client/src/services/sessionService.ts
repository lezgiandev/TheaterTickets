import axios from 'axios';
import { API_URL } from '@/services/baseURL';
import type { Genre, SeatResponse, Session, Theatre } from '@/types';

export const getSessions = async (params?: {
    theatre?: number;
    genre?: number;
    search?: string;
    price_min?: number;
    price_max?: number;
    date_from?: string;
    date_to?: string;
}): Promise<Session[]> => {
    try {
        const response = await axios.get<Session[]>(`${API_URL}/sessions/`, {
            params: {
                theatre: params?.theatre,
                genre: params?.genre,
                search: params?.search,
                price_min: params?.price_min,
                price_max: params?.price_max,
                date_from: params?.date_from,
                date_to: params?.date_to
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении сеансов:', error);
        throw error;
    }
};

export const getSessionById = async (sessionId: number): Promise<Session> => {
    try {
        const response = await axios.get<Session>(`${API_URL}/sessions/${sessionId}/`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении выбранного сеанса:', error);
        throw error;
    }
};

export const getSeats = async (sessionId: number): Promise<SeatResponse[]> => {
    try {
        const response = await axios.get<SeatResponse[]>(`${API_URL}/sessions/${sessionId}/seats/`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении мест у выбранного сеанса:', error);
        throw error;
    }
}

export const getGenres = async (): Promise<Genre[]> => {
    try {
        const response = await axios.get<Genre[]>(`${API_URL}/genres/`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении жанров:', error);
        throw new Error('Не удалось загрузить список жанров');
    }
};

export const getTheatres = async (): Promise<Theatre[]> => {
    try {
        const response = await axios.get<Theatre[]>(`${API_URL}/theatres/`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении театров:', error);
        throw new Error('Не удалось загрузить список театров');
    }
};