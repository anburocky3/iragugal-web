import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((to, from) => {
  if (!authStore.isAuthenticated) {
    return navigateTo({ name: "auth-login" });
  }
});
