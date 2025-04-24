<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
    <NavBarComponent />
    <div class="max-w-screen-2xl mx-auto flex-grow container py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
          Все сеансы
        </h1>

        <button
            @click="showFilters = !showFilters"
            class="flex md:hidden items-center gap-2 bg-neutral-800/50 px-4 py-2.5 rounded-xl hover:bg-neutral-700/50 transition-colors"
        >
          <FilterIcon class="w-5 h-5 text-amber-400" />
          <span>{{ showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}</span>
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Фильтры -->
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 -translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-4"
        >
          <div
              v-if="showFilters || !isMobile"
              class="bg-neutral-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-neutral-700/50 md:sticky md:top-8"
              style="min-width: 300px; height: fit-content;"
          >
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
              <FilterIcon class="w-6 h-6 text-amber-400" />
              <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Фильтры</span>
            </h2>

            <div class="space-y-6">
              <!-- Поля фильтров с иконками -->
              <div>
                <label class="text-sm font-medium text-amber-200 mb-2 flex items-center gap-2">
                  <SearchIcon class="w-4 h-4" /> Поиск
                </label>
                <input
                    v-model="filters.search"
                    type="text"
                    class="w-full px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-gray-400 transition-all"
                    placeholder="Название или описание..."
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-amber-200 mb-2">Жанр</label>
                <select v-model="filters.genre"
                        class="w-full px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-gray-400 transition-all">
                  <option :value="undefined" class="bg-neutral-800">Все жанры</option>
                  <option v-for="genre in sessionStore.genres" :key="genre.id" :value="genre.id" class="bg-neutral-800">
                    {{ genre.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-amber-200 mb-2">Театр</label>
                <select v-model="filters.theatre"
                        class="w-full px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-gray-400 transition-all">
                  <option :value="undefined" class="bg-neutral-800">Все театры</option>
                  <option v-for="theatre in sessionStore.theatres" :key="theatre.id" :value="theatre.id" class="bg-neutral-800">
                    {{ theatre.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-amber-200 mb-2">Цена</label>
                <div class="flex gap-3">
                  <input v-model.number="filters.price_min" type="number" placeholder="От"
                         class="w-1/2 px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400">
                  <input v-model.number="filters.price_max" type="number" placeholder="До"
                         class="w-1/2 px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-amber-200 mb-2">Дата</label>
                <div class="flex gap-3">
                  <input v-model="filters.date_from" type="date"
                         class="w-1/2 px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <input v-model="filters.date_to" type="date"
                         class="w-1/2 px-4 py-2.5 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                </div>
              </div>

              <div class="grid gap-3">
                <button
                    @click="applyFilters"
                    class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 px-4 rounded-xl hover:scale-[1.02] transition-all font-medium"
                >
                  <CheckIcon class="w-5 h-5" />
                  Применить
                </button>
                <button
                    @click="resetFilters"
                    class="w-full flex items-center justify-center gap-2 text-amber-400 py-2.5 px-4 rounded-xl hover:bg-neutral-700/30 transition-colors font-medium"
                >
                  <XIcon class="w-5 h-5" />
                  Сбросить
                </button>
              </div>
          </div>
        </div>
        </transition>

        <!-- Список сеансов -->
        <div class="flex-1">
          <!-- Индикатор загрузки -->
          <div v-if="sessionStore.isLoading" class="flex flex-col items-center justify-center h-96 gap-4">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            <p class="text-neutral-400">Загрузка сеансов...</p>
          </div>

          <!-- Сообщение об ошибке -->
          <div
              v-else-if="sessionStore.error"
              class="bg-red-900/30 border border-red-400/30 p-6 mb-6 rounded-xl backdrop-blur-lg flex items-center gap-3"
          >
            <AlertCircleIcon class="w-8 h-8 text-red-400" />
            <p class="text-red-200">{{ sessionStore.error }}</p>
          </div>

          <!-- Пустой список -->
          <div
              v-else-if="sessionStore.sessions.length === 0"
              class="bg-neutral-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-neutral-700/50 text-center flex flex-col items-center gap-4"
          >
            <span class="text-6xl">🎭</span>
            <p class="text-neutral-400">Сеансы не найдены</p>
          </div>

          <!-- Карточки сеансов -->
          <div v-else class="grid grid-cols-1 gap-6 md:pr-2">
            <div
                v-for="session in sessionStore.sessions"
                :key="session.id"
                class="group bg-neutral-800/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-500/30 transition-all hover:shadow-amber-500/10"
            >
              <div class="md:flex">
                <div class="md:flex-shrink-0 relative w-full md:w-64 h-64 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent z-10"></div>
                  <img
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      :src="session.picture"
                      :alt="session.title"
                  >
                </div>

                <div class="p-6 md:p-8 flex-1">
                  <div class="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <h2 class="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        {{ session.title }}
                      </h2>
                      <div class="flex items-center mt-2 space-x-3">
                        <span class="bg-neutral-700/50 px-3 py-1 rounded-full text-sm text-amber-300 flex items-center gap-1">
                          <HomeIcon class="w-4 h-4" /> {{ session.theatre.name }}
                        </span>
                        <span class="bg-neutral-700/50 px-3 py-1 rounded-full text-sm text-orange-300 flex items-center gap-1">
                          <TagsIcon class="w-4 h-4" /> {{ session.genre.name }}
                        </span>
                      </div>
                    </div>
                    <span class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-1.5 rounded-xl text-lg font-bold shrink-0">
                      {{ session.price }} ₽
                    </span>
                  </div>

                  <p class="text-neutral-300 leading-relaxed mb-6 line-clamp-2">
                    {{ session.description }}
                  </p>

                  <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center text-amber-300">
                      <CalendarDaysIcon class="w-5 h-5 mr-2" />
                      <span class="font-medium">{{ formatDate(session.date_time) }}</span>
                      <span class="mx-2 text-neutral-500">•</span>
                      <span class="text-neutral-400">{{ session.duration }}</span>
                    </div>

                    <router-link
                        :to="`/details?id=${session.id}`"
                        class="flex items-center text-amber-400 hover:text-amber-300 font-medium group transition gap-1"
                    >
                      Подробнее
                      <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </router-link>
                  </div>
                </div>
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
import { ref, onMounted, computed } from 'vue';
import { useSessionStore } from '@/stores/sessionStore';
import { debounce } from 'lodash';
import {
  FilterIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  AlertCircleIcon,
  CalendarDaysIcon,
  HomeIcon,
  TagsIcon,
  ArrowRightIcon
} from 'lucide-vue-next';
import FooterComponent from "@/components/FooterComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

const sessionStore = useSessionStore();
const showFilters = ref(false);
const isMobile = computed(() => window.innerWidth < 768);

const filters = ref({
  search: undefined as string | undefined,
  genre: undefined as number | undefined,
  theatre: undefined as number | undefined,
  price_min: undefined as number | undefined,
  price_max: undefined as number | undefined,
  date_from: undefined as string | undefined,
  date_to: undefined as string | undefined,
});

onMounted(async () => {
  await sessionStore.fetchGenres();
  await sessionStore.fetchTheatres();
  await sessionStore.fetchSessions();
});

const applyFilters = debounce(() => {
  sessionStore.fetchSessions(filters.value);
}, 300);

const resetFilters = () => {
  filters.value = {
    search: undefined,
    genre: undefined,
    theatre: undefined,
    price_min: undefined,
    price_max: undefined,
    date_from: undefined,
    date_to: undefined,
  };
  sessionStore.fetchSessions();
};

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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>