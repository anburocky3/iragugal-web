<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

withDefaults(
  defineProps<{
    id: string;
    type?: string;
    placeholder: string;
    modelValue?: string | number;
    error?: string;
    helpText?: string;
  }>(),
  {
    type: "text",
  }
);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :id="id"
    class="mt-2 px-4 py-2 rounded border w-full focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
    :value="modelValue"
    @input="updateValue"
  />
  <span class="mt-2 text-xs text-gray-500 block" v-if="helpText">
    {{ helpText }}
  </span>
  <span class="text-red-500 text-sm mt-2" v-if="error">{{ error }}</span>
</template>
