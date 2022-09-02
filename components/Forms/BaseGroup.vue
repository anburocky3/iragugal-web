<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label: string;
    required?: boolean;
  }>(),
  {
    required: true,
  }
);
</script>

<template>
  <div>
    <label :for="id" class="block text-gray-800"
      >{{ label }} <span v-if="required" class="text-red-500">*</span></label
    >
    <slot />
  </div>
</template>
