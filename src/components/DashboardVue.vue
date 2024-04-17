<template>
<div id="q-app" style="min-height: 100vh;">
<div class="q-pa-md row items-start q-gutter-md">
  
  <q-card  v-if="curr_user.role == '1'" flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Nombre de managés</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ curr_user.manage.length }}
      </q-card-section>

      <q-separator inset />

      <q-card-section>  
       
      </q-card-section>

    </q-card>
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
    <q-card  v-if="curr_user.role == '1' || curr_user.role == '2'" flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Mon prochain entretien personnel</div>
      </q-card-section>

      <q-card-section class="">
        <q-timeline layout="dense" side="alternate" color="secondary">
          <q-timeline-entry
            v-for="(entretien, index) in entretiens_perso"
            :key="index"
            :title="entretien.description"
            :subtitle="entretien.date + ' ' + entretien.time"
            :color="orange"
            icon="event"
          >
          <div>
            <br>
            Avec: {{ users[entretien.managerId-1].firstname}} {{users[entretien.managerId-1].lastname}}
          </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>

      <q-separator inset />

      <q-card-section>

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
            :title="entretien.description"
            :subtitle="entretien.date + ' ' + entretien.time"
            :color="orange"
            icon="event"
          >
          <div>
            <br>
            Avec: {{ users[entretien.managedId-1].firstname}} {{users[entretien.managedId-1].lastname}}
          </div>
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
import entretiensData from '../data/entretiens.json'
import users from '../data/users.json'
import { ref } from 'vue'

const store = useLoginStore()

const curr_user = store.getCurrentUser


const entretiens = ref([])

const manager = ref(usersData.find(user => user.id === curr_user.managerId))


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
.my-card
  width: 100%
  max-width: 250px
</style>
  