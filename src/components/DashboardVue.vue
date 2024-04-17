<template>
<div id="q-app" :class="{ 'q-dark': isDarkMode }" style="min-height: 100vh;">
<div class="q-pa-md row items-start q-gutter-md">
  <q-btn label="Toggle Dark Mode" @click="toggleDarkMode"  />
  <q-card  v-if="curr_user.role == '1'" flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Nombre de managés</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ curr_user.manage.length }}
      </q-card-section>


    </q-card>

    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Mon prochain entretien personnel :</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <q-timeline layout="dense" side="alternate" color="secondary">

          <q-timeline-entry
            v-for="(entretien, index) in entretiens_perso"
            :key="index"
            :color="orange"
            icon="event"
          >
          <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" style="margin-left: 10%;">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ entretien.description }}</div>
                <div class="text-subtitle2">Avec: {{ users[entretien.managerId-1].firstname}} {{users[entretien.managerId-1].lastname}}</div>
                <div class="text-subtitle2">Date: {{ entretien.date }} {{ entretien.time }}</div>
              </div>

            </div>
          </q-card-section>

          <q-separator />

        </q-card>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div> 
    <q-card  v-if="curr_user.role == '2'" flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Mon manager</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
      
      </q-card-section>
      <q-card-section class="q-pt-none">
      <div>name: {{ manager.firstname }} {{ manager.lastname }}</div>
      <div>email: {{ manager.email }}</div>
      <div>phone: {{ manager.phone }}</div>
      <!-- Add more fields as needed -->
      </q-card-section>



    </q-card>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Mes entretiens :</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <q-timeline layout="dense" side="alternate" color="secondary">

          <q-timeline-entry
            v-for="(entretien, index) in entretiens"
            :key="index"
            :color="orange"
            icon="event"
          >
          <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" style="margin-left: 10%;">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ entretien.description }}</div>
                <div class="text-subtitle2">Avec: {{ users[entretien.managedId-1].firstname}} {{users[entretien.managedId-1].lastname}}</div>
                <div class="text-subtitle2">Date: {{ entretien.date }} {{ entretien.time }}</div>
              </div>

            </div>
          </q-card-section>

          <q-separator />

        </q-card>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
  </div>
</div>


</template>
  


<script setup>

import  { useLoginStore } from '../stores/login.js'
import {DarkmodeStore} from '../stores/darkmode.js'
import entretiensData from '../data/entretiens.json'
import users from '../data/users.json'
import { ref,computed } from 'vue'

const store = useLoginStore()

const darkMode = DarkmodeStore()

// Method to toggle dark mode
const toggleDarkMode = () => {
  darkMode.toggleDarkMode
  console.log(darkMode.getDarkMode)
}


const curr_user = store.getCurrentUser


const entretiens = ref([])

const manager = ref(users.find(user => user.id === curr_user.managerId))


const entretiens_perso = ref(entretiensData.filter(entretien => entretien.managedId === curr_user.id))


for (const entretien of entretiensData) {
  if (entretien.managerId === curr_user.id) {
    entretiens.value.push(entretien)
  }
} 

console.log('entretiensData:', entretiensData)
console.log('users:', users)



</script>


<style lang="sass" scoped>

.dark-mode 
  background-color: #333
  color: #fff


.my-card
  width: 100%
  max-width: 250px
</style>
  