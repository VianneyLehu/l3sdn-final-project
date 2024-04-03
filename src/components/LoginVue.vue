<template>
    <p> test </p>
    <div>
        <template v-if="showLoginForm">
            <q-input
                v-model="emailOrPhone"
                label="Email or Phone"
                type="text"
            ></q-input>
            <q-input
                v-model="password"
                label="Password"
                type="password"
            ></q-input>
            <q-btn label="Login" @click="loginU"></q-btn>
            <div>
                Don't have an account? <a href="#" @click="showLoginForm = false">Register</a>
            </div>
        </template>
        <template v-else>
            <!-- Register form goes here -->
            <q-input
                v-model="registerEmail"
                label="Email"
                type="text"
            ></q-input>
            <q-input
                v-model="registerPhone"
                label="Phone"
                type="text"
            ></q-input>
            <q-input
                v-model="registerFirstName"
                label="FirstName"
                type="text"
            ></q-input>
            <q-input
                v-model="registerLastName"
                label="LastName"
                type="text"
            ></q-input>
            <q-input
                v-model="registerPassword"
                label="Password"
                type="password"
            ></q-input>
            <q-btn label="Register" @click="registerU"></q-btn>
            <div>
                Already have an account? <a href="#" @click="showLoginForm = true">Login</a>
            </div>
        </template>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from 'src/stores/login.js'
const store = useLoginStore ()
const showLoginForm = ref(true)
const emailOrPhone = ref('')
const password = ref('')
const registerEmail = ref('')
const registerPhone = ref('')
const registerFirstName = ref('')
const registerLastName = ref('')
const registerPassword = ref('')

const registerU = () => {
    store.registerUser(registerFirstName.value, registerLastName.value, 
    registerEmail.value,  registerPhone.value, registerPassword.value )
    console.log(store.log)
}

const loginU = () => {
    store.loginUsers(emailOrPhone.value, password.value)
}
</script>