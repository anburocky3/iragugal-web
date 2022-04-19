<script setup lang="ts">
import { useGlobalApp } from "~/stores";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { BaseSelectOptions } from "~/types";
import FirebaseDataService from "~/services/FirebaseDataService";
import Swal from "sweetalert2";

useHead({
  title: "Become a Iragugal Member",
});

definePageMeta({
  middleware: "guest",
});

const globalApp = useGlobalApp();

const interestedData: BaseSelectOptions[] = [
  { id: 1, title: "Politics" },
  { id: 2, title: "Business" },
  { id: 3, title: "Social Service" },
];

const membershipInterestData: BaseSelectOptions[] = [
  { id: 1, title: "Basic Member" },
  { id: 2, title: "Volition Member" },
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  name: yup.string().required().min(4),
  dob: yup.string().required(),
  email: yup.string().required().email(),
  fatherName: yup.string().required().min(4),
  waNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  communicationAddress: yup.string().required().min(10).max(100),
  currentLocation: yup.string().required().min(4).max(60),
  voteLocation: yup.string().required().min(10),
  interestedIn: yup.string().required(),
  membershipInterest: yup.string().required(),
  agreeTerms: yup.boolean().oneOf([true]),
});

const { errors, handleSubmit, meta } = useForm({
  validationSchema: schema,
});

const { value: name } = useField<string>("name");
const { value: dob } = useField<string>("dob");
const { value: email } = useField<string>("email");
const { value: fatherName } = useField<string>("fatherName");
const { value: waNumber } = useField<number>("waNumber");
const { value: communicationAddress } = useField<string>(
  "communicationAddress"
);
const { value: currentLocation } = useField<string>("currentLocation");
const { value: voteLocation } = useField<string>("voteLocation");
const { value: interestedIn } = useField<string>("interestedIn");
const { value: membershipInterest } = useField<string>("membershipInterest");
const { value: agreeTerms } = useField<boolean>("agreeTerms");

const onSubmit = handleSubmit(async (values) => {
  await FirebaseDataService.insertRegistration(values);

  navigateTo({ name: "index" });
  Swal.fire(
    `Great ${name.value}!`,
    "Thanks for your interest, your info is recorded. Good luck.",
    "success"
  );
});
</script>

<template>
  <main class="max-w-7xl mx-auto my-10 flex gap-10 flex-col sm:flex-row">
    <div class="border rounded p-5 sm:p-10 flex-1 order-1 sm:order-none">
      <div class="space-y-2">
        <h2
          class="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-red-700"
        >
          Become Iragugal Member
          <span
            class="ml-3 px-2 py-1.5 rounded tracking-wider text-xs bg-orange-200 border-orange-400 animate-pulse text-black"
            >PLUS</span
          >
        </h2>
        <p class="text-gray-500">Come, change the nation with us!</p>
      </div>
      <!-- Fields -->
      <form @submit.prevent="onSubmit">
        <div class="space-y-5 my-5">
          <div class="grid grid-cols-4 gap-5">
            <div class="col-span-4 sm:col-span-3">
              <FormsBaseGroup for="name" label="Full name" required>
                <FormsBaseInput
                  id="name"
                  placeholder="Full name"
                  v-model="name"
                  :error="errors.name"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4 sm:col-span-1">
              <FormsBaseGroup for="dob" label="Date of Birth:">
                <FormsBaseInput
                  id="dob"
                  type="date"
                  placeholder="1970-12-06"
                  v-model="dob"
                  :error="errors.dob"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4">
              <FormsBaseGroup for="fatherName" label="Father name:">
                <FormsBaseInput
                  id="fatherName"
                  placeholder="Father name"
                  v-model="fatherName"
                  :error="errors.fatherName"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4 sm:col-span-2">
              <FormsBaseGroup for="emailAddress" label="Email address:">
                <FormsBaseInput
                  id="emailAddress"
                  placeholder="Email Address"
                  v-model="email"
                  :error="errors.email"
                  help-text="We'll never share your email with anyone else."
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4 sm:col-span-2">
              <FormsBaseGroup for="waNumber" label="WhatsApp number:">
                <FormsBaseInput
                  id="waNumber"
                  placeholder="+91 9876541235"
                  v-model="waNumber"
                  :error="errors.waNumber"
                  help-text="We won't distrub you frequently!"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4">
              <FormsBaseGroup
                for="communicationAddress"
                label="Communication address:"
              >
                <FormsBaseTextArea
                  id="communicationAddress"
                  placeholder="Communication Address"
                  v-model="communicationAddress"
                  :error="errors.communicationAddress"
                  rows="4"
                  class="resize-none"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4 sm:col-span-2">
              <FormsBaseGroup for="currentLocation" label="Current Location:">
                <FormsBaseInput
                  id="currentLocation"
                  placeholder="Current Location"
                  v-model="currentLocation"
                  :error="errors.currentLocation"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4 sm:col-span-2">
              <FormsBaseGroup for="voteLocation" label="Vote Location:">
                <FormsBaseInput
                  id="voteLocation"
                  placeholder="Vote Location"
                  v-model="voteLocation"
                  :error="errors.voteLocation"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-2">
              <FormsBaseGroup for="interestedIn" label="Field of interest">
                <FormsBaseSelect
                  id="interestedIn"
                  v-model="interestedIn"
                  placeholder="sds"
                  :options="interestedData"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-2">
              <FormsBaseGroup
                for="membershipInterest"
                label="Membership interest"
              >
                <FormsBaseSelect
                  id="membershipInterest"
                  v-model="membershipInterest"
                  placeholder="sda"
                  :options="membershipInterestData"
                />
              </FormsBaseGroup>
            </div>
            <div class="col-span-4">
              <label class="text-gray-700">
                <input type="checkbox" v-model="agreeTerms" />
                I hereby, agree all terms and condition mentioned on
                iragugal.com
              </label>
              <div class="text-xs text-red-500 mt-2" v-if="errors.agreeTerms">
                You have to accept the terms to proceed.
              </div>
            </div>
          </div>
        </div>
        <FormsButton
          variant="primary"
          text="Register"
          :disabled="!meta.dirty"
          :class="{ 'cursor-not-allowed opacity-75': !meta.dirty }"
        />
      </form>
    </div>
    <div
      class="border rounded p-10 w-96 flex flex-col items-center shadow h-fit"
    >
      <img src="/iragugal.png" alt="Iragugal" class="w-60" />
      <p class="my-10 text-center leading-8 text-gray-600">
        We are fighting for a better, fairer, and brighter future for every
        Indian. <br />
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
      <a
        :href="globalApp.WAGroup"
        target="_blank"
        class="border rounded border-green-600 px-4 py-2 w-full text-green-600 hover:bg-green-600 hover:text-white text-center"
      >
        Chat
      </a>
    </div>
  </main>
</template>
