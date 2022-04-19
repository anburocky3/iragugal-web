<script setup lang="ts">
import { useGlobalApp } from "~/stores";
import { useAuthStore } from "~~/stores/auth";
import FirebaseDataService from "~~/services/FirebaseDataService";
import Swal from "sweetalert2";

const globalApp = useGlobalApp();
const authStore = useAuthStore();

const logout = async () => {
  await FirebaseDataService.logout;

  authStore.removeAuth();

  navigateTo({ name: "auth-login" });
  Swal.fire(
    `Logged out successfully`,
    "You have been logged out successfully!",
    "success"
  );
};
</script>

<template>
  <header class="bg-green-600 text-white py-4 px-10 sticky top-0 z-50">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <h2>
          <nuxt-link :to="{ name: 'index' }" class="text-xl font-semibold">{{
            globalApp.appName
          }}</nuxt-link>
        </h2>
        <ul class="flex space-x-5 items-center">
          <!-- <li>Manifesto</li> -->
          <template v-if="authStore.isAuthenticated">
            <li>
              <div class="font-semibold flex space-x-5 items-center">
                <div>Hello {{ authStore.user.displayName }}</div>
                <div>
                  <img
                    :src="`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${authStore.user.displayName}`"
                    class="rounded-full w-8 h-8"
                  />
                </div>
              </div>
            </li>
            <li>
              <button
                type="button"
                @click="logout()"
                class="px-4 py-2 rounded shadow bg-red-600 uppercase text-sm hover:bg-red-700"
              >
                <IconsLogin /> Logout
              </button>
            </li>
          </template>
          <li v-else>
            <nuxt-link
              :to="{ name: 'auth-login' }"
              class="px-4 py-2 rounded shadow bg-gray-800 uppercase text-sm hover:bg-gray-900"
            >
              <IconsLogin /> Login</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
