<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Member } from '~/types';
import FirebaseDataService from '~/services/FirebaseDataService';
import { shareWhatsApp, calculateAge, getMembershipType } from '~/helpers';
import { useGlobalApp } from '~/stores';

useHead({
  title: 'Iragugal Registrations',
});

definePageMeta({
  middleware: 'auth',
});

const globalApp = useGlobalApp();

let isLoaded = ref(false);

const data: Member[] = await FirebaseDataService.getAllRegistrations();

isLoaded.value = true;

// .then((response: any) => {
//     isLoaded.value = true;
//     data = response.data as Member[];

//     console.log("data", data);
//   })
//   .catch((e: Error) => {
//     console.log(e);
//   });

// const people: Member[] = [
//   {
//     name: "Anbuselvan Rocky",
//     fatherName: "Annamalai",
//     dob: "12-06-1996",
//     email: "anbuceo@gmail.com",
//     waNumber: "8939738801",
//     communicationAddress:
//       "Dubai main road, dubai streat road, dubai, Arab Emirates.",
//     currentLocation: "Chennai",
//     voteLocation: "Avadi, Chennai",
//     interestedIn: "Politics",
//     role: "Basic",
//   },
// ];

const membershipStyling = (membershipInterest: string) => {
  let general = 'px-4 py-1 rounded-full font-semibold uppercase text-xs ';

  if (membershipInterest === 'Basic') {
    general += 'bg-green-500 text-white';
  } else {
    general += 'bg-blue-500 text-white';
  }

  return general;
};
</script>

<template>
  <div class="container mx-auto my-10">
    <div class="bg-white p-10 rounded border shadow space-y-5">
      <div class="flex justify-between">
        <div class="space-y-2">
          <h2 class="text-xl font-semibold">Registrations</h2>
          <p class="text-gray-600">You can find the registration data</p>
        </div>
        <div class="flex items-center space-x-4">
          <a
            :href="globalApp.WAGroup"
            target="_blank"
            class="bg-white px-4 py-2 rounded text-green-500 border border-green-500 uppercase font-semibold text-sm tracking-wider hover:bg-green-500 hover:text-white flex items-center"
          >
            <IconsWhatsApp />
            WhatsApp
          </a>
          <a
            :href="shareWhatsApp()"
            target="_blank"
            class="bg-indigo-500 px-4 py-2 rounded text-white uppercase font-semibold text-sm tracking-wider hover:bg-indigo-600 flex items-center"
          >
            <IconsShare />
            Share
          </a>
        </div>
      </div>
      <div>
        <table class="min-w-full divide-y divide-gray-300 border rounded">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-10"
              >
                ID
              </th>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Contact Info
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Location
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Interested In
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Membership
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(person, index) in data" :key="person.email">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6"
              >
                #{{ index + 1 }}
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6"
              >
                <div class="font-medium text-base">
                  {{ person.name }} ({{ calculateAge(person.dob) }})
                </div>
                <div class="mt-2">S/O {{ person.fatherName }}</div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                <div class="font-medium">{{ person.waNumber }}</div>
                <div class="mt-2">{{ person.email }}</div>
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-800"
                :title="person.communicationAddress"
              >
                <div class="font-medium">
                  {{ person.currentLocation }}
                </div>
                <div class="mt-2">(Voting: {{ person.voteLocation }})</div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ person.interestedIn }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                  :class="
                    membershipStyling(
                      getMembershipType(person.membershipInterest)
                    )
                  "
                  >{{ getMembershipType(person.membershipInterest) }}</span
                >
              </td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <button
                  onclick="alert('Currently Not available, 😉')"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  View <span class="sr-only">, {{ person.name }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
