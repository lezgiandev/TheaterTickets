<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
    <NavBarComponent />
    <div class="max-w-screen-2xl mx-auto flex-grow container py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mb-8 gap-4">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
          Мои билеты
        </h1>
        <p class="text-neutral-400">История всех ваших бронирований</p>
      </div>
      
      <div
          v-if="bookingStore.bookings.length === 0"
          class="bg-neutral-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-neutral-700/50 text-center flex flex-col items-center gap-6"
      >
        <TicketIcon class="w-16 h-16 text-amber-400/30" />
        <div class="space-y-2">
          <p class="text-neutral-400">У вас нет активных бронирований</p>
          <router-link
              to="/sessions"
              class="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors gap-1"
          >
            Выбрать сеанс
            <ArrowRightIcon class="w-4 h-4" />
          </router-link>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6">
        <div
            v-for="booking in bookingStore.bookings"
            :key="booking.id"
            class="group bg-neutral-800/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-500/30 transition-all hover:shadow-amber-500/10"
        >
          <div class="md:flex">
            <div class="md:w-64 relative h-64 md:h-full overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent z-10" />
              <img
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  :src="booking.session.picture"
                  :alt="booking.session.title"
              >
              <div class="absolute bottom-4 left-4 z-20">
                <span class="bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full text-sm backdrop-blur-lg">
                  № {{ booking.id }}
                </span>
              </div>
            </div>

            <div class="p-6 md:p-8 flex-1">
              <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h2 class="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {{ booking.session.title }}
                  </h2>
                  <div class="flex items-center mt-2 space-x-3">
                    <span class="bg-neutral-700/50 px-3 py-1 rounded-full text-sm text-amber-300 flex items-center gap-1">
                      <HomeIcon class="w-4 h-4" /> {{ booking.session.theatre.name }}
                    </span>
                    <span class="bg-neutral-700/50 px-3 py-1 rounded-full text-sm text-orange-300 flex items-center gap-1">
                      <TagsIcon class="w-4 h-4" /> {{ booking.session.genre.name }}
                    </span>
                  </div>
                </div>
                <span class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-1.5 rounded-xl text-lg font-bold shrink-0">
                  {{ booking.session.price }} ₽
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="flex items-start gap-3">
                  <CalendarDaysIcon class="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-amber-200 mb-1">Дата и время</p>
                    <p class="text-neutral-300">{{ formatDate(booking.session.date_time) }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <ArmchairIcon class="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-amber-200 mb-1">Место</p>
                    <p class="text-neutral-300">Ряд {{ booking.seat.row }}, Место {{ booking.seat.number }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <TheaterIcon class="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-amber-200 mb-1">Зал</p>
                    <p class="text-neutral-300">{{ booking.session.theatre.name }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <WalletIcon class="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-amber-200 mb-1">Статус</p>
                    <p class="text-neutral-300">Оплачено · Электронный билет</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center text-amber-300 gap-2 border-t border-neutral-700/50 pt-4">
                <CheckCircleIcon class="w-5 h-5 text-emerald-400" />
                <span class="font-medium">Бронь подтверждена</span>
                <span class="text-neutral-500 mx-2">·</span>
                <span class="text-sm text-neutral-400">{{ formatBookingDate(booking.booking_date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBookingStore } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import {
  AlertCircleIcon,
  ArrowRightIcon,
  TicketIcon,
  HomeIcon,
  TagsIcon,
  CalendarDaysIcon,
  TheaterIcon,
  WalletIcon,
  CheckCircleIcon,
  ArmchairIcon
} from 'lucide-vue-next';
import FooterComponent from "@/components/FooterComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

const bookingStore = useBookingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await router.push('/login');
    return;
  }
  await bookingStore.fetchBookings();
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>