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
        if(this.darkMode){
            this.darkMode = false
        }else{
            this.darkMode = true
        }
    },
  },
})
