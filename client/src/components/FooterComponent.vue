<template>
  <footer class="bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-700/50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- О нас -->
        <div class="space-y-4">
          <h3 class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-xl font-bold">
            Teatroo
          </h3>
          <p class="text-neutral-400 leading-relaxed">
            Платформа для бронирования билетов с интерактивным выбором мест и мгновенным подтверждением.
          </p>
        </div>

        <!-- Навигация -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-neutral-200">Навигация</h4>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.name">
              <router-link
                  :to="link.path"
                  class="group flex items-center text-neutral-400 hover:text-amber-400 transition-all duration-300"
              >
                <span class="mr-2 opacity-0 group-hover:opacity-100 group-hover:mr-3 transition-all">→</span>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-neutral-200">Контакты</h4>
          <ul class="space-y-3">
            <li class="flex items-center text-neutral-400">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              theatretickets@gmail.com
            </li>
            <li class="flex items-center text-neutral-400">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +1 (999) 999-99-99
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-neutral-200">Сообщество</h4>
          <div class="flex space-x-4">
            <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                class="p-2 bg-neutral-800 hover:bg-amber-400/10 rounded-lg transition-all duration-300 group"
            >
              <component
                  :is="social.icon"
                  class="w-6 h-6 text-neutral-400 group-hover:text-amber-400 transition-colors"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-neutral-800 mt-12 pt-8 text-center">
        <p class="text-neutral-500">
          © 2025 <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Teatroo</span>.
          Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { GithubIcon } from 'lucide-vue-next'

const links = [
  { name: 'Главная', path: '/' },
  { name: 'Афиша', path: '/sessions' },
  { name: 'Мои билеты', path: '/bookings' },
]

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/lezgiandev/TheaterTickets',
    icon: GithubIcon
  }
]
</script>