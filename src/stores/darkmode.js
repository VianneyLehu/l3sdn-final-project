import { defineStore } from 'pinia'

export const DarkmodeStore = defineStore('darkmode', {
  state: () => ({
    darkMode: false, 
  }),

  getters: {

    getDarkMode() {
      return this.darkMode
    },
  },

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
  },
})
