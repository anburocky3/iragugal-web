<script setup lang="ts">
import { BaseSelectOptions } from "~/types";

const emit = defineEmits(["update:modelValue"]);

withDefaults(
  defineProps<{
    id: string;
    placeholder: string;
    options: BaseSelectOptions[];
    modelValue?: string;
    error?: string;
  }>(),
  {}
);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <select
    :id="id"
    class="mt-2 px-4 py-2 rounded border w-full focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
    :value="modelValue"
    @input="updateValue"
  >
    <option v-for="option in options" :key="`select-${option}`">
      {{ option.title }}
    </option>
  </select>
  <span class="text-red-500 text-sm mt-2" v-if="error">{{ error }}</span>
</template>
