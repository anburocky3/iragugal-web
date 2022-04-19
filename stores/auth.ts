import { User, UserInfo } from "@firebase/auth-types";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {} as UserInfo,
      loggedIn: false,
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    isAuthenticated() {
      return this.loggedIn;
    },
    loggedInUser() {
      return this.user;
    },
  },
  actions: {
    updateAuth(user: UserInfo) {
      // this.state.user = user;
      this.user = user;
      this.loggedIn = true;
    },
    removeAuth() {
      this.user = {};
      this.loggedIn = false;
    },
  },
});
