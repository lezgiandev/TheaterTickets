<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
    <NavBarComponent />
    <div class="max-w-7xl mx-auto flex-grow container py-8 px-4 sm:px-6 lg:px-8">
      <button
          @click="router.back()"
          class="group flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-all"
      >
        <ArrowLeftIcon class="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform" />
        Назад к афише
      </button>

      <div v-if="sessionStore.currentSession" class="bg-neutral-800/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-neutral-700/50">
        <div class="md:flex">
          <div class="md:w-1/3 relative h-96 md:h-[500px] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent z-10" />
            <img
                class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                :src="sessionStore.currentSession.picture"
                :alt="sessionStore.currentSession.title"
            >
            <div class="absolute bottom-4 left-4 z-20">
              <span class="bg-amber-400/10 text-amber-300 px-4 py-2 rounded-xl backdrop-blur-lg font-bold shadow-lg">
                {{ sessionStore.currentSession.price }} ₽
              </span>
            </div>
          </div>

          <div class="p-8 md:p-10 flex-1 space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
                {{ sessionStore.currentSession.title }}
              </h1>
              <div class="inline-flex items-center bg-neutral-700/40 px-4 py-2 rounded-full gap-2">
                <TheaterIcon class="w-5 h-5 text-amber-400" />
                <span class="font-medium text-amber-200">
                  {{ sessionStore.currentSession.genre.name }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-6">
                <div class="bg-neutral-700/30 p-6 rounded-xl border border-neutral-600/50">
                  <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
                    <InfoIcon class="w-6 h-6" />
                    Информация
                  </h3>
                  <div class="space-y-4">
                    <div class="flex items-start gap-4">
                      <div class="p-2 bg-amber-400/10 rounded-lg">
                        <MapPinIcon class="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-neutral-300">Театр</p>
                        <p class="text-lg text-white">{{ sessionStore.currentSession.theatre.name }}</p>
                        <p class="text-neutral-400 mt-1 text-sm">
                          {{ sessionStore.currentSession.theatre.address }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start gap-4">
                      <div class="p-2 bg-amber-400/10 rounded-lg">
                        <CalendarIcon class="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-neutral-300">Дата и время</p>
                        <p class="text-lg text-white">
                          {{ formatDateTime(sessionStore.currentSession.date_time) }}
                        </p>
                        <p class="text-neutral-400 mt-1 text-sm">
                          Длительность: {{ sessionStore.currentSession.duration }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-neutral-700/30 p-6 rounded-xl border border-neutral-600/50">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
                  <FileTextIcon class="w-6 h-6" />
                  Описание
                </h3>
                <p class="text-neutral-300 leading-relaxed">
                  {{ sessionStore.currentSession.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="sessionStore.currentSession" class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Выбор мест</h2>

        <div class="flex flex-wrap gap-4 mb-6">
          <div class="flex items-center">
            <div class="w-6 h-6 rounded bg-neutral-600 mr-2"></div>
            <span class="text-neutral-300">Занято</span>
          </div>
          <div class="flex items-center">
            <div class="w-6 h-6 rounded bg-amber-600 mr-2"></div>
            <span class="text-neutral-300">Свободно</span>
          </div>
          <div class="flex items-center">
            <div class="w-6 h-6 rounded bg-amber-300 mr-2"></div>
            <span class="text-neutral-300">Выбрано</span>
          </div>
        </div>

        <div class="bg-neutral-800/50 rounded-xl p-6 overflow-auto border border-neutral-700">
          <div class="flex justify-center mb-4">
            <div class="bg-neutral-700 text-center py-2 px-24 md:py-12 md:px-80 rounded-lg text-sm font-medium">
              Сцена
            </div>
          </div>

          <div class="flex justify-center">
            <div class="grid gap-2" :style="{ gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))` }">
              <template v-for="row in rows" :key="row">
                <div
                    v-for="seat in seatsByRow(row)"
                    :key="`${row}-${seat.number}`"
                    @click="selectSeat(seat)"
                    :class="[
                    'w-6 h-6 md:w-20 md:h-20 rounded flex items-center justify-center cursor-pointer transition-all',
                    {
                      'bg-neutral-600 cursor-not-allowed': !seat.is_available,
                      'bg-amber-600 hover:bg-amber-500': seat.is_available && !isSeatSelected(seat),
                      'bg-amber-300': isSeatSelected(seat)
                    }
                  ]"
                    :title="seat.is_available ? `Ряд ${row}, Место ${seat.number}` : 'Занято'"
                >
                  <span class="text-xs">{{ seat.number }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center" v-if="selectedSeats.length > 0">
          <button
              @click="openPaymentModal"
              class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition transform hover:scale-105"
          >
            Оформить бронь ({{ selectedSeats.length }})
          </button>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div
          v-if="showPaymentModal"
          class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div class="bg-neutral-800/90 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-neutral-700/50 backdrop-blur-lg">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Подтверждение брони</h2>
            <button
                @click="showPaymentModal = false"
                class="p-2 hover:bg-neutral-700/30 rounded-lg transition-colors"
            >
              <XIcon class="w-6 h-6 text-neutral-400" />
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-3 text-amber-300">Выбранные места</h3>
              <div class="bg-neutral-700/50 rounded-lg p-4 space-y-2">
                <div
                    v-for="seat in selectedSeats"
                    :key="`${seat.row}-${seat.number}`"
                    class="flex justify-between items-center py-2 border-b border-neutral-600/50 last:border-0"
                >
                  <span class="text-neutral-300">Ряд {{ seat.row }}, Место {{ seat.number }}</span>
                  <span class="text-amber-400 font-medium">{{ sessionStore.currentSession?.price }} ₽</span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center text-lg">
              <span class="font-semibold">Итого:</span>
              <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-bold">
                {{ totalPrice }} ₽
              </span>
            </div>

            <div
                v-if="!authStore.isAuthenticated"
                class="bg-amber-400/10 border-l-4 border-amber-400 p-4 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <AlertCircleIcon class="w-6 h-6 text-amber-400" />
                <div>
                  <p class="text-amber-300 mb-2">Требуется авторизация</p>
                  <router-link
                      to="/login"
                      class="inline-flex items-center text-white hover:text-amber-300 gap-1"
                      @click="showPaymentModal = false"
                  >
                    Войти в аккаунт
                    <ArrowRightIcon class="w-4 h-4" />
                  </router-link>
                </div>
              </div>
            </div>

            <button
                v-else
                @click="confirmBooking"
                :disabled="bookingStore.isLoading"
                class="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <template v-if="bookingStore.isLoading">
                <LoaderIcon class="animate-spin w-5 h-5" />
                Обработка...
              </template>
              <template v-else>
                <CheckIcon class="w-5 h-5" />
                Подтвердить бронь
              </template>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/sessionStore';
import { useAuthStore } from '@/stores/authStore';
import { useBookingStore } from '@/stores/bookingStore';
import type { SeatResponse } from '@/types';
import {
  ArrowLeftIcon,
  InfoIcon,
  MapPinIcon,
  CalendarIcon,
  FileTextIcon,
  TheaterIcon,
  XIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  CheckIcon,
  LoaderIcon
} from 'lucide-vue-next';
import FooterComponent from "@/components/FooterComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

const route = useRoute();
const router = useRouter();
const sessionStore = useSessionStore();
const authStore = useAuthStore();
const bookingStore = useBookingStore();

const showPaymentModal = ref(false);
const selectedSeats = ref<SeatResponse[]>([]);

onMounted(async () => {
  const sessionId = Number(route.query.id);
  if (sessionId) {
    await sessionStore.fetchSessionById(sessionId);
    await sessionStore.fetchSeats(sessionId);
  }
});

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const rows = computed(() => {
  if (!sessionStore.seats.length) return [];
  const uniqueRows = new Set(sessionStore.seats.map(seat => seat.row));
  return Array.from(uniqueRows).sort((a, b) => a - b);
});

const maxColumns = computed(() => {
  if (!sessionStore.seats.length) return 0;
  return Math.max(...rows.value.map(row =>
      sessionStore.seats.filter(seat => seat.row === row).length
  ));
});

const seatsByRow = (row: number) => {
  return sessionStore.seats
      .filter(seat => seat.row === row)
      .sort((a, b) => a.number - b.number);
};

const isSeatSelected = (seat: SeatResponse) => {
  return selectedSeats.value.some(s =>
      s.row === seat.row && s.number === seat.number
  );
};

const selectSeat = (seat: SeatResponse) => {
  if (!seat.is_available) return;

  if (isSeatSelected(seat)) {
    selectedSeats.value = selectedSeats.value.filter(s =>
        !(s.row === seat.row && s.number === seat.number)
    );
  } else {
    selectedSeats.value.push({...seat});
  }
};

const totalPrice = computed(() => {
  if (!sessionStore.currentSession) return 0;
  return selectedSeats.value.length * sessionStore.currentSession.price;
});

const openPaymentModal = () => {
  if (selectedSeats.value.length === 0) return;
  showPaymentModal.value = true;
};

const confirmBooking = async () => {
  if (!sessionStore.currentSession || selectedSeats.value.length === 0) return;

  try {
    for (const seat of selectedSeats.value) {
      await bookingStore.addBooking(
          sessionStore.currentSession.id,
          seat.id
      );
    }

    showPaymentModal.value = false;
    selectedSeats.value = [];

    await sessionStore.fetchSeats(sessionStore.currentSession.id);
    await bookingStore.fetchBookings();

    alert('Бронирование успешно оформлено!');
  } catch (error) {
    console.error('Booking error:', error);
    alert('Произошла ошибка при бронировании');
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>