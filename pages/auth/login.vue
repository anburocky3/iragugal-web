<script setup lang="ts">
import { User, UserInfo } from "@firebase/auth-types";
import Swal from "sweetalert2";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import FirebaseDataService from "~~/services/FirebaseDataService";
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();

useHead({
  title: "Login with Iragugal",
});

const schema = yup.object({
  email: yup.string().required().email("Proper Email id is required"),
  password: yup.string().required().min(8),
});

// Create a form context with the validation schema
const { errors, handleSubmit, meta, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

// email.value = "anbuceo@gmail.com";
// password.value = "123456789";

const onSubmit = handleSubmit(async (values) => {
  const user: UserInfo = await FirebaseDataService.loginUser(
    values.email,
    values.password
  );

  authStore.updateAuth(user);

  navigateTo({ name: "admin" });
  Swal.fire(`Welcome ${user.displayName}!`, "You are the rockstar!", "success");
});
</script>

<template>
  <div class="bg-white shadow p-10 rounded m-10 max-w-xl mx-auto">
    <div class="space-y-1">
      <h1 class="text-xl font-semibold">Login Page</h1>
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
          type="password"
          placeholder="Password"
          v-model="password"
          :error="errors.password"
        />
      </FormsBaseGroup>

      <FormsButton
        variant="primary"
        text="Login"
        :disabled="!meta.valid"
        :is-submitting="isSubmitting"
        :class="{ 'cursor-not-allowed opacity-75': !meta.valid }"
      />
    </form>
  </div>
</template>
