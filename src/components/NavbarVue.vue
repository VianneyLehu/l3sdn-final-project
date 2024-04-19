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
          
    </q-list>
  </q-drawer>

  <q-page-container :class="darkMode ? 'bg-dark text-white' : 'bg-grey-2 text-black'"
>
    <router-view/>
  </q-page-container>
</q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data() {
    return {
      drawer: false ,
      darkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.$q.dark.set(this.darkMode)

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



</style>