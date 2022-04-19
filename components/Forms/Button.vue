<script setup lang="ts">
withDefaults(
  defineProps<{
    variant: string;
    text: string;
    isSubmitting?: boolean;
  }>(),
  {
    variant: "primary",
    isSubmitting: false,
  }
);
</script>

<template>
  <button
    class="px-4 py-2 rounded bg-blue-500 text-white w-full hover:bg-blue-600"
  >
    <span v-if="isSubmitting"><IconsLoading /> </span>
    {{ text }}
  </button>
</template>
