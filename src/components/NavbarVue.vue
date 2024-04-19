<template>
  <q-layout view="lHh Lpr lFf" :dark="darkMode">
    <q-header elevated :class="darkMode ? 'bg-dark text-white' : 'text-black'" style="background-color:lightgrey">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          :icon-color="darkMode ? 'white' : 'black'"
          @click="drawer = !drawer" 
          
          
        />
        <q-toolbar-title class="menu" :class="darkMode ? 'text-white' : 'text-black'" >
          Menu
        </q-toolbar-title>
        <q-space/>
      </q-toolbar>
    </q-header>

    <q-drawer
    
      v-model="drawer"
      bordered
      :class="darkMode ? 'bg-dark text-white' : 'bg-grey-2 text-black'"

    >
    
      
      <q-list>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/dashboard')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/entretiens')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Entretiens</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/manages')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/listes')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Liste</q-item-label>
          </q-item-section>
        </q-item>
        
          <q-btn
            style="align-items: center; padding-top: 5%; padding-left: 5%;"
                flat
                dense
                aria-label="Mode Sombre"
                :icon="darkMode ? 'dark_mode' : 'light_mode'" 
                color="yellow-8"
                :label="darkMode ? 'Mode Sombre' : 'Mode Clair'"
                @click="toggleDarkMode"
              />

              <div v-if="darkMode" class="bat-icon" @click="toggleDarkMode">
    <div class="bat" :class="{ 'fly': flying }"></div>
  </div>
          
    </q-list>
  </q-drawer>

  <q-page-container :class="darkMode ? 'bg-dark text-white' : 'bg-grey-2 text-black'"
>
    <router-view/>
  </q-page-container>
</q-layout>
</template>

<script>

import batImage from '../assets/bat.png'

export default {
  name: 'MainLayout',
  data() {
    return {
      drawer: false ,
      darkMode: false,
      flying: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.$q.dark.set(this.darkMode)
      if (this.darkMode) {
        this.flying = true
        setTimeout(() => {
          this.flying = false
        }, 2000) // 2 seconds
      }
    }
  }

    }
  


</script>

<style scoped>


.menu {
  color: black;
}

.bg-dark {
  background-color: #1f1f1f; 
}

.bg-grey-9 {
  background-color: #f9f9f9; 
}

.bat-icon {
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.bat {
  position: absolute;
  top: -80%;
  left: 320%;
  width: 80%;
  height: 80%;
  background-image: url(../assets/bat.png);
  background-size: cover;
  transition: transform 2s linear;
}

.dark-mode .bat {
  background-color: #fff;
  
}

.fly {
  animation: bat-fly 2s infinite;
}

@keyframes bat-fly {
  0% { transform: translateY(0); }
  50% { transform: translateY(-400%); }
  100% { transform: translateY(0); }

}

</style>