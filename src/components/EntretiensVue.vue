<template>
    <div>
      <h2>Create New Entretien</h2>
      <q-form class="q-gutter-md" @submit="createEntretien">
        <q-date v-model="date" label="Date" class="q-mb-md"/>
        <q-time v-model="time" label="Time" class="q-mb-md" />
        <q-select  v-model="selectedManagedId" :options="managed" label="Managed" dense outlined />
        <q-input v-model="description" label="Description" />
        <q-btn type="submit" label="Create Entretien" />
      </q-form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useLoginStore } from '../stores/login.js'
  
  const store = useLoginStore()
  const date = ref('')
  const time = ref('')
  const description = ref('')
  const data = ref([])
  const managed = ref([])
  const selectedManagedId = ref([])
    // Fetch the managed users from the API on component mount
    onMounted(async () => {
    try {
        const response = await axios.get('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees')
        
        data.value = response.data

        
        const managedUsersData = store.getManagedEmployees(data.value) 
        console.log(managedUsersData)

  
        managed.value = managedUsersData.map(user => ({
        label: `${user.firstname} ${user.lastname}`,
        value: user.id
        }))

    } catch (error) {
        console.error('Error fetching managed users:', error)
    }
    })
  const createEntretien = async () => {

    const currentUser = store.getCurrentUser
    const newEntretien = {
      id: null, // You may need to generate a unique ID for the new entretien
      date: date.value,
      time: time.value,
      description: description.value,
      managerId: currentUser.id, // Assuming managerId is available in the currentUser object
      managedId: selectedManagedId.value.value
    }
  
    try {
      // Fetch the existing entretiens from the API
      const response = await axios.get('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/entretiens')
      let existingEntretiens = response.data
  
      // Add the new entretien to the existing entretiens
      existingEntretiens.push(newEntretien)
  
      // Perform a PUT request to update the entretiens data
      await axios.put('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/entretiens', existingEntretiens)
  
      // Optional: Reset form fields after successful submission
      date.value = ''
      time.value = ''
      description.value = ''
  
      console.log('Entretien created successfully!')
    } catch (error) {
      console.error('Error creating entretien:', error)
    }
  }

  
  </script>
  
  <style scoped>
  
  div {
    max-width: 400px; 
    margin: 0 auto; 
    padding: 20px;
    border-radius: 8px;
  }
  
h2{
    text-align: center;
  }

  .q-form {
    margin-top: 20px;
  }
  
  .q-date,
  .q-time,
  .q-select,
  .q-input {
    margin-bottom: 15px;
    margin-left: 14%;
  }
  
  .q-btn {
    margin-top: 20px;
  }
  
  h2 {
    margin-top: 0;
  }
  
 
  
  .q-field__control {
    border-radius: 4px;
    align-items: center;
    
  }
  
  .q-btn {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    margin: center;
    width: 100%;


  } 
  
  </style>
  
  
