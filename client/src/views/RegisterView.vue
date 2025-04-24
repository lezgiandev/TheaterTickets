<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
    <NavBarComponent />
    <div class="max-w-md mx-auto flex-grow container py-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-neutral-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-neutral-700/50">
        <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Регистрация
        </h1>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-amber-200 mb-2">Имя пользователя</label>
            <input v-model="userData.username" type="text" required
                   class="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400">
          </div>

          <div>
            <label class="block text-sm font-medium text-amber-200 mb-2">Пароль</label>
            <input v-model="userData.password" type="password" required
                   class="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400">
          </div>

          <div v-if="errorMessage" class="text-red-400 text-sm text-center">
            {{ errorMessage }}
          </div>

          <button type="submit"
                  class="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-xl hover:scale-[1.02] transition-transform font-medium">
            Зарегистрироваться
          </button>
        </form>

        <p class="text-center mt-6 text-neutral-400">
          Уже есть аккаунт?
          <router-link to="/login" class="text-amber-400 hover:text-amber-300 transition-colors">
            Войти
          </router-link>
        </p>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import NavBarComponent from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const authStore = useAuthStore();
const userData = ref({
  username: '',
  password: ''
});
const errorMessage = ref('');

const handleRegister = async () => {
  try {
    errorMessage.value = '';
    await authStore.register(userData.value);
  } catch (error) {
    errorMessage.value = 'Ошибка регистрации. Возможно, имя пользователя уже занято';
  }
};
</script>