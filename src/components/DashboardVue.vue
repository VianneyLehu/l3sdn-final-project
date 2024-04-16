<template>
<div id="q-app" style="min-height: 100vh;">
<div class="q-pa-md row items-start q-gutter-md">
  
  <q-card flat bordered class="my-card">
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
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Prochain entretien</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
       
      </q-card-section>

      <q-separator inset />

      <q-card-section>

      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Mon manager</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
      
      </q-card-section>

      <q-separator inset />

      <q-card-section>

      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Mon prochain entretien personnel</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
     
      </q-card-section>

      <q-separator inset />

      <q-card-section>

      </q-card-section>
    </q-card>
  </div>
</div>


</template>
  


<script setup>

import  { useLoginStore } from '../stores/login.js'
import { ref } from 'vue'

const store = useLoginStore()

const curr_user = store.getCurrentUser


console.log(curr_user)

</script>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
  