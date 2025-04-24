<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
    <NavBarComponent />

    <!-- Hero Section -->
    <section class="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-700/50 overflow-hidden">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="animate-fade-in">
          <h1 class="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter">
            <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Teatroo
            </span>
          </h1>
          <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-neutral-300 leading-relaxed">
            Погрузитесь в мир театральных постановок с интерактивным выбором мест
          </p>
          <router-link
              to="/sessions"
              class="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 group"
          >
            <span>Начать выбор</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
        </div>
      </div>
      <div class="absolute inset-0 opacity-30 bg-[url('@/assets/grid-pattern.svg')] bg-top" />
    </section>

    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900/30 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Наши преимущества
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
              v-for="(feature, index) in features"
              :key="index"
              class="bg-neutral-800/30 backdrop-blur-lg p-8 rounded-2xl border border-neutral-700/50 hover:border-amber-400/20 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 group"
          >
            <div class="w-16 h-16 mb-6 bg-amber-400/10 rounded-2xl flex items-center justify-center">
              <component
                  :is="feature.icon"
                  class="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform"
              />
            </div>
            <h3 class="text-2xl font-bold mb-4 text-neutral-100">{{ feature.title }}</h3>
            <p class="text-neutral-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Скоро в театре
          </h2>
          <p class="text-neutral-400 max-w-2xl mx-auto">Откройте для себя предстоящие премьеры и специальные события</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="session in featuredSessions"
              :key="session.id"
              class="bg-neutral-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-400/20 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 group"
          >
            <div class="relative h-96 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent z-10"/>
              <img
                  :src="session.picture"
                  :alt="session.title"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              >
              <div class="absolute bottom-4 left-4 z-20">
                <span class="bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full text-sm backdrop-blur-lg">
                  {{ session.genre.name }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-neutral-100">{{ session.title }}</h3>
              <div class="flex items-center text-amber-300 mb-4">
                <CalendarDaysIcon class="w-5 h-5 mr-2"/>
                <span>{{ formatDate(session.date_time) }}</span>
              </div>
              <p class="text-neutral-400 leading-relaxed line-clamp-2 mb-6">{{ session.description }}</p>
              <router-link
                  :to="`/details?id=${session.id}`"
                  class="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium group"
              >
                Подробнее
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSessionStore } from '@/stores/sessionStore';
import {
  CalendarDaysIcon,
  TicketIcon,
  ShieldCheckIcon,
  VenetianMaskIcon
} from 'lucide-vue-next';
import type { Session } from '@/types';
import FooterComponent from "@/components/FooterComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

const sessionStore = useSessionStore();
const featuredSessions = ref<Session[]>([]);

const features = [
  {
    icon: VenetianMaskIcon,
    title: 'Эксклюзивные постановки',
    description: 'Уникальные спектакли от ведущих режиссеров и актерских составов'
  },
  {
    icon: TicketIcon,
    title: 'Мгновенное бронирование',
    description: 'Интерактивная карта зала и моментальное подтверждение брони'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Защита данных',
    description: 'SSL-шифрование и безопасные платежи через проверенные системы'
  }
];

onMounted(async () => {
  await sessionStore.fetchSessions();
  featuredSessions.value = sessionStore.sessions.slice(0, 3);
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
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>