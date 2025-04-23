import {defineStore} from 'pinia';
import {ref} from 'vue';
import {getGenres, getSeats, getSessionById, getSessions, getTheatres,} from '@/services/sessionService';
import type {Genre, SeatResponse, Session, Theatre} from '@/types';

export const useDictionaryStore = defineStore('sessions', () => {
    const sessions = ref<Session[]>([]);
    const genres = ref<Genre[]>([]);
    const theatres = ref<Theatre[]>([])
    const currentSession = ref<Session | null>(null);
    const seats = ref<SeatResponse[]>([])

    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchSessions = async (params?: {
        theatre?: number;
        genre?: number;
        search?: string;
        price_min?: number;
        price_max?: number;
        date_from?: string;
        date_to?: string;
    }) => {
        isLoading.value = true;
        error.value = null;
        try {
            sessions.value = await getSessions({
                ...params,
            });
        } catch (err) {
            error.value = 'Ошибка при загрузке сессий';
            console.error('Ошибка при загрузке сессий:', err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchSessionById = async (sessionId: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            currentSession.value = await getSessionById(sessionId);

            if (!sessions.value.find(s => s.id === sessionId)) {
                sessions.value.push(currentSession.value);
            }
        } catch (err) {
            error.value = 'Ошибка при загрузке сессии';
            console.error('Ошибка при загрузке сессии:', err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchSeats = async (sessionId: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            seats.value = await getSeats(sessionId);
        } catch (err) {
            error.value = 'Ошибка при загрузке мест';
            console.error('Ошибка при загрузке мест:', err);
            throw err;
        }
    }

    const fetchGenres = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            genres.value = await getGenres();
        } catch (err) {
            error.value = 'Ошибка при загрузке сессии';
            console.error('Ошибка при загрузке сессии:', err);
            throw err;
        }
    };

    const fetchTheatres = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            theatres.value = await getTheatres();
        } catch (err) {
            error.value = 'Ошибка при загрузке сессии';
            console.error('Ошибка при загрузке сессии:', err);
            throw err;
        }
    };

    return {
        sessions,
        genres,
        theatres,
        currentSession,
        isLoading,
        error,
        fetchGenres,
        fetchSeats,
        fetchSessions,
        fetchTheatres,
        fetchSessionById,
    };
});