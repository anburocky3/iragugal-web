import { defineStore } from "pinia";

export const useGlobalApp = defineStore("app", {
  state: () => {
    return {
      appName: "Iragugal",
      WAGroup: "https://chat.whatsapp.com/Fq3wGZWViCu7WX2lE29P91",
    };
  },
  actions: {},
});
