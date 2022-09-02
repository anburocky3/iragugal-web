<script setup lang="ts">
import Swal from 'sweetalert2';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import FirebaseDataService from '~~/services/FirebaseDataService';
import { UserInfo } from '@firebase/auth-types';

useHead({
  title: 'Register',
});

const schema = yup.object({
  fullName: yup.string().required().min(4).max(120),
  email: yup.string().required().email('Proper Email id is required'),
  password: yup.string().required().min(8),
});

// Create a form context with the validation schema
const { errors, handleSubmit, meta, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: fullName } = useField<string>('fullName');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

fullName.value = 'Anbuselvan';
email.value = 'anbuceo@gmail.com';
password.value = '123456789';

const onSubmit = handleSubmit(async (values) => {
  const user: UserInfo = await FirebaseDataService.createUser(
    values.fullName,
    values.email,
    values.password
  );

  navigateTo({ name: 'admin' });
  Swal.fire(`Welcome ${user.displayName}!`, 'You are the rockstar!', 'success');
});
</script>

<template>
  <div class="bg-white shadow p-10 rounded m-10 max-w-xl mx-auto">
    <div class="space-y-1">
      <h1 class="text-xl font-semibold">Register</h1>
      <p class="text-gray-600 text-sm">Register yourself as registered user.</p>
    </div>
    <form class="my-5 space-y-5" @submit.prevent="onSubmit">
      <FormsBaseGroup id="fullName" label="Full name">
        <FormsBaseInput
          id="fullName"
          placeholder="Full name"
          v-model="fullName"
          :error="errors.fullName"
        />
      </FormsBaseGroup>

      <FormsBaseGroup id="email" label="Email">
        <FormsBaseInput
          id="email"
          placeholder="Email Address"
          v-model="email"
          :error="errors.email"
        />
      </FormsBaseGroup>

      <FormsBaseGroup id="password" label="Password">
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
        text="Register"
        :disabled="!meta.valid"
        :isSubmitting="isSubmitting"
        :class="{ 'cursor-not-allowed opacity-75': !meta.valid }"
      />
    </form>
  </div>
</template>
