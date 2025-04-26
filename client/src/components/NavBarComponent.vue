<template>
  <nav class="bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-700/50 sticky top-0 z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Логотип с градиентом -->
        <router-link
            to="/"
            class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-2xl font-bold tracking-tighter"
        >
          Tickets
        </router-link>

        <!-- Десктопное меню -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link
              v-if="!authStore.isAuthenticated"
              to="/login"
              class="text-neutral-300 hover:text-amber-400 transition-all duration-300 group"
          >
            <span class="mr-1">→</span>
            Вход
            <div class="h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </router-link>

          <router-link
              to="/sessions"
              class="text-neutral-300 hover:text-amber-400 text-lg font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              v-if="authStore.isAuthenticated"
          >
            Афиша
          </router-link>

          <router-link
              to="/bookings"
              class="flex items-center space-x-2 text-neutral-300 hover:text-amber-400 group transition-colors duration-300"
              v-if="authStore.isAuthenticated"
          >
            <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"/>
            </svg>
            <span>Билеты</span>
          </router-link>

          <button
              @click="authStore.logout()"
              class="ml-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700/50 rounded-lg transition-all duration-300 group"
              v-if="authStore.isAuthenticated"
          >
            <span class="flex items-center space-x-2 text-neutral-300 group-hover:text-amber-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Выйти</span>
            </span>
          </button>
        </div>

        <!-- Мобильное меню -->
        <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg hover:bg-neutral-800/50 transition-colors duration-300"
        >
          <svg
              class="w-6 h-6 text-neutral-300"
              :class="{ 'rotate-90': isMobileMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
            />
          </svg>
        </button>
      </div>

      <!-- Мобильное меню контент -->
      <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
      >
        <div v-show="isMobileMenuOpen" class="lg:hidden pb-4 space-y-4">
          <router-link
              to="/sessions"
              @click="isMobileMenuOpen = false"
              class="block py-3 px-4 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/30 rounded-lg transition-colors duration-300"
          >
            Афиша
          </router-link>

          <router-link
              to="/bookings"
              @click="isMobileMenuOpen = false"
              class="block py-3 px-4 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/30 rounded-lg transition-colors duration-300"
          >
            Ваши билеты
          </router-link>

          <button
              @click="handleMobileLogout"
              class="w-full text-left py-3 px-4 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/30 rounded-lg transition-colors duration-300"
          >
            Выйти
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleMobileLogout = async () => {
  isMobileMenuOpen.value = false;
  await authStore.logout();
};
</script>