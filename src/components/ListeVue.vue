<template>
  <div>
    <h1>Liste des Managés</h1>
    <q-btn color="primary" label="Ajouter un Managé" @click="showAddManagerDialog = true" />
    <q-input v-model="search" borderless dense debounce="300" color="primary"  placeholder="Rechercher..." class="q-mb-md"
    :class="{ 'q-focused': search, 'q-filled': search }">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-table
      class="q-table__container--standard-center"
      :rows="filteredEmployees"
      :columns="columns"
      align="center"
      row-key="id"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td class="center">{{ props.row.firstname }}</q-td>
          <q-td class="center">{{ props.row.lastname }}</q-td>
          
          <q-td class="center">
            <q-btn  color="primary" label="Éditer" @click="editManager(props.row)" ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Formulaire d'édition du manager -->
    <q-dialog v-model="showEditDialog">
      <q-card>
        <q-card-section>
          <h2>Éditer Managé</h2>
          <q-input v-model="editedManager.firstname" outlined  label="Prénom"></q-input>
          <q-input v-model="editedManager.lastname" outlined  label="Nom"></q-input>
          <q-input v-model="editedManager.email" outlined  label="Nom"></q-input>
          <q-input v-model="editedManager.phone" outlined  label="Téléphone"></q-input>
          <q-input v-model="editedManager.password" outlined  label="Téléphone"></q-input>


          <!-- Autres champs d'édition -->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Enregistrer" @click="saveManagerChanges"></q-btn>
          <q-btn label="Annuler" @click="cancelEdit"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showAddManagerDialog">
      <q-card>
        <q-card-section>
          <h2>Ajouter un Managé</h2>
          <q-input v-model="newManager.firstname" outlined label="Prénom"></q-input>
          <q-input v-model="newManager.lastname" outlined label="Nom"></q-input>
          <q-select v-if="currentUser.role === 0" v-model="newManager.selectedManagerId" :options="managerOptions" label="Manager" dense outlined />
          <q-input v-model="newManager.email" outlined label="Email"></q-input>
          <q-input v-model="newManager.phone" outlined label="Téléphone"></q-input>
          <q-input v-model="newManager.password" outlined label="Mot de passe"></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Enregistrer" @click="saveNewManager"></q-btn>
          <q-btn label="Annuler" @click="cancelAddManager"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '../stores/login.js'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { api } from 'boot/axios'
const data = ref([])



const search = ref('')
const loginStore = useLoginStore()
const managedEmployees = ref([])
const currentUser = ref(loginStore.getCurrentUser)
const editedManager = ref(null)
const showEditDialog = ref(false)
const showAddManagerDialog = ref(false)
const managerOptions = ref([])



onMounted(async () => {
    const result = await api.get('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees')
    data.value = result.data

    managerOptions.value = loginStore.getAllManagers(data.value).map(manager => ({
    label: `${manager.firstname} ${manager.lastname}`,
    value: manager.id
}))
  })

const managerList = ref([loginStore.getAllManagers(data.value)])












function updateManagerManagedEmployees(manager, managedEmployee,api) {

  console.log('manager:',manager)
  for (const employee of api) {
    if (employee.id === manager) {
      employee.manage.push(managedEmployee)
    }
  }
}

function registerUser(firstname,name, email, phone, password, selected,api) {
        
        // Trouver le dernier ID dans le fichier JSON
        const lastidplus1 = api[api.length - 1].id + 1

        const newUser= {id: lastidplus1, firstname : firstname, lastname : name, password : password,  role : '2',  phone : phone, email : email,  manage : [] }
        if(selected == null) {
          api.push(newUser)
          console.log('api:',api)
          updateManagerManagedEmployees(currentUser.value.id, lastidplus1,api)
        }

        else {
          
          api.push(newUser)
          console.log('api:',api)
          updateManagerManagedEmployees(selected, lastidplus1,api)
        }

}

const newManager = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  selectedManagerId: null
})

async function saveNewManager() {
  console.log('data', data.value)

  if (newManager.value.selectedManagerId==null){
    registerUser(newManager.value.firstname, newManager.value.lastname, newManager.value.email, newManager.value.phone, newManager.value.password, newManager.value.selectedManagerId, data.value)
  }
  else{
    console.log(newManager.value.selectedManagerId.value)
    registerUser(newManager.value.firstname, newManager.value.lastname, newManager.value.email, newManager.value.phone, newManager.value.password, newManager.value.selectedManagerId.value, data.value)
  }

  const sanitizedData = JSON.parse(JSON.stringify(data.value))
  
  await api.put('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees', sanitizedData)
  // Réinitialiser le formulaire et fermer le dialogue
  console.log('test')
  managedEmployees.value = loginStore.getManagedEmployees(data.value)
  newManager.value = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    selectedManagerId: null
  }
 
  showAddManagerDialog.value = false
  const result = await api.get('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees')
  data.value = result.data
  managedEmployees.value = loginStore.getManagedEmployees(data.value)


}

function cancelAddManager() {
  // Réinitialiser le formulaire et fermer le dialogue
  newManager.value = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    selectedManagerId: null
  }
  showAddManagerDialog.value = false
}

// Filtre des employés en fonction de la recherche
const filteredEmployees = computed(() => {
  if (!search.value) {
    return loginStore.getManagedEmployees(data.value)
  } else {
    return loginStore.getManagedEmployees(data.value).filter(employee => {
      return employee.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
             employee.lastname.toLowerCase().includes(search.value.toLowerCase())
    })
  }
})

const columns = [
  { name: 'firstname', label: 'Prénom', sortable: true, align : 'center'},
  { name: 'lastname', label: 'Nom', sortable: true, align : 'center'},
  { name: 'actions', label: 'Actions', align : 'center'}
  
]

function editManager(manager) {
  editedManager.value = { ...manager, manage:[]}
  showEditDialog.value = true
}

async function saveManagerChanges() {
  loginStore.updateManager(editedManager.value,data.value)
  const sanitizedData = JSON.parse(JSON.stringify(data.value))


  api.put('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees', sanitizedData)

  const result = await api.get('https://rod-apps-restis-api-01.azurewebsites.net/api/etienne/employees')
  data.value = result.data

  showEditDialog.value = false
  managedEmployees.value = loginStore.getManagedEmployees(data.value)
}

function cancelEdit() {
  editedManager.value = null
  showEditDialog.value = false
}

onMounted(async () => {
  managedEmployees.value = await loginStore.getManagedEmployees(data.value)
  if (currentUser.value.role === 0) {
    managerList.value = await loginStore.getAllManagers(data.value)
  }
  console.log('managedEmployees:', managedEmployees.value)
})

onMounted(() => {
  
  console.log('currentUser:', currentUser.value)
})
</script>

<style>

/* Style pour le cadre lorsque l'entrée est active */
.q-input.q-focused input {
  border-color: var(--q-color-primary);
  /* Autres styles souhaités */
}

/* Style pour le cadre lorsque l'entrée contient du contenu */
.q-input.q-filled input {
  border-color: var(--q-color-primary);
  /* Autres styles souhaités */
}

.center {
  text-align: center;
}
</style>

