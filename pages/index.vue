<script setup lang="ts">
import { useGlobalApp } from "~/stores";
useHead({
  title: "Change with Iragugal - Iragugal.com",
});

definePageMeta({
  layout: false,
});

const globalApp = useGlobalApp();
</script>
<template>
  <div
    class="min-h-screen w-full max-w-6xl m-auto flex flex-col items-center justify-center p-10"
  >
    <img src="/iragugal.png" alt="Iragugal" width="250" />
    <p class="my-10 text-lg text-center leading-8 text-gray-600">
      We are fighting for a better, fairer, and brighter future for every
      Indian.
      <nuxt-link :to="{ name: 'become-iragugal' }">
        <strong class="text-blue-500 font-semibold hover:underline"
          >Join Us, Lets Change.</strong
        >
      </nuxt-link>
      <br />
      Stand with us to make sure every Indian is protected, every citizen has
      economic freedom. As Iragugal, we respect differences of perspective and
      belief, and pledge to work together to move this country forward.
    </p>
    <div class="space-y-4 flex flex-col items-center">
      <nuxt-link
        to="/become-iragugal"
        class="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600"
        >Join Us, Lets Change.</nuxt-link
      >

      <a
        :href="globalApp.WAGroup"
        target="_blank"
        class="px-4 py-2 rounded border border-green-600 text-green-600 hover:bg-green-500 hover:text-white"
        >Chat</a
      >
    </div>
  </div>
</template>
