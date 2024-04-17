<template>
  <div>
    <h1>Liste des Managers</h1>
    <q-btn color="primary" label="Ajouter un Manager" @click="showAddManagerDialog = true" />
    <q-input v-model="search" borderless dense debounce="300" color="primary"  placeholder="Rechercher..." class="q-mb-md"
    :class="{ 'q-focused': search, 'q-filled': search }">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-table
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
          <h2>Éditer Manager</h2>
          <q-input v-model="editedManager.firstname" outlined  label="Prénom"></q-input>
          <q-input v-model="editedManager.lastname" outlined  label="Nom"></q-input>
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
          <h2>Ajouter un Manager</h2>
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



const search = ref('')
const loginStore = useLoginStore()
const managedEmployees = ref([])
const currentUser = ref(loginStore.getCurrentUser)
const editedManager = ref(null)
const showEditDialog = ref(false)
const showAddManagerDialog = ref(false)
const managerList = ref([loginStore.getAllManagers])

const managerOptions = loginStore.getAllManagers.map(manager => ({
  label: `${manager.firstname} ${manager.lastname}`,
  value: manager.id
}))


const newManager = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  selectedManagerId: null
})

function saveNewManager() {
  
  console.log(newManager.value.selectedManagerId.value)
  
  loginStore.registerUser(newManager.value.firstname, newManager.value.lastname, newManager.value.email, newManager.value.phone, newManager.value.password, newManager.value.selectedManagerId.value)
  // Réinitialiser le formulaire et fermer le dialogue
  console.log('test')
  managedEmployees.value = loginStore.getManagedEmployees
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
    return loginStore.getManagedEmployees
  } else {
    return loginStore.getManagedEmployees.filter(employee => {
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
  editedManager.value = { ...manager }
  showEditDialog.value = true
}

function saveManagerChanges() {
  loginStore.updateManager(editedManager.value)
  showEditDialog.value = false
  managedEmployees.value = loginStore.getManagedEmployees
}

function cancelEdit() {
  editedManager.value = null
  showEditDialog.value = false
}

onMounted(async () => {
  managedEmployees.value = await loginStore.getManagedEmployees
  if (currentUser.value.role === 0) {
    managerList.value = await loginStore.getAllManagers
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

