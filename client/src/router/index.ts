import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import SessionsView from "@/views/SessionsView.vue";
import DetailsView from "@/views/DetailsView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookingView from "@/views/BookingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: SessionsView
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView,
      props: route => ({ id: route.query.id })
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: BookingView,
      meta: { requiresAuth: true }
    }
  ]
})

export default router