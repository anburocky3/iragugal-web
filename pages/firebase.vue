<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { addUsers } from "~~/services/firebaseDB";

useHead({
  title: "Login with Iragugal",
});

const schema = yup.object({
  email: yup.string().required().email("Proper Email id is required"),
  password: yup.string().required().min(8),
});

// Create a form context with the validation schema
const { errors, handleSubmit, meta } = useForm({
  validationSchema: schema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async (values) => {
  const res = await addUsers(values).then((data) => console.log("Log", data));
});
</script>

<template>
  <div class="bg-white shadow p-10 rounded m-10 max-w-xl mx-auto">
    <div class="space-y-1">
      <h1 class="text-xl font-semibold">Adding data to Firebase</h1>
      <p class="text-gray-600 text-sm">Login and check your data here</p>
    </div>
    <form class="my-5 space-y-5" @submit.prevent="onSubmit">
      <FormsBaseGroup for="email" label="Email">
        <FormsBaseInput
          id="email"
          placeholder="Email Address"
          v-model="email"
          :error="errors.email"
        />
      </FormsBaseGroup>

      <FormsBaseGroup for="password" label="Password">
        <FormsBaseInput
          id="password"
          placeholder="Password"
          v-model="password"
          :error="errors.password"
        />
      </FormsBaseGroup>

      <FormsButton
        variant="primary"
        text="Login"
        :disabled="!meta.dirty"
        :class="{ 'cursor-not-allowed opacity-75': !meta.dirty }"
      />
    </form>
  </div>
</template>
