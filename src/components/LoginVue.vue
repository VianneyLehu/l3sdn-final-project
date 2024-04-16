<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../assets/icon.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="showLoginForm">
            <q-form class="q-gutter-md">
              <q-input
                v-model="emailOrPhone"
                filled
                label="Email or Phone"
                lazy-rules
              />

              <q-input
                v-model="password"
                type="password"
                filled
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Login" type="button" color="primary" @click="loginU"/>
              </div>
            </q-form>
            <div>
              Don't have an account? <a href="#" @click="showLoginForm = false">Register</a>
            </div>
          </q-card-section>
          <q-card-section v-else>
            <q-form class="q-gutter-md">
              <q-input
                v-model="registerEmail"
                filled
                label="Email"
                lazy-rules
              />

              <q-input
                v-model="registerPhone"
                filled
                label="Phone"
                lazy-rules
              />

              <q-input
                v-model="registerFirstName"
                filled
                label="First Name"
                lazy-rules
              />

              <q-input
                v-model="registerLastName"
                filled
                label="Last Name"
                lazy-rules
              />

              <q-input
                v-model="registerPassword"
                type="password"
                filled
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Register" type="button" color="primary" @click="registerU"/>
              </div>
            </q-form>
            <div>
              Already have an account? <a href="#" @click="showLoginForm = true">Login</a>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { defineComponent } from 'vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useLoginStore } from 'src/stores/login.js'

  const router = useRouter()
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
    store.registerUser(registerFirstName.value, registerLastName.value, registerEmail.value, registerPhone.value, registerPassword.value)
    console.log(store.log)
  }

  const loginU = () => {
    if (store.loginUser(emailOrPhone.value, password.value)) {
      console.log('test')
      router.push('/dashboard')
    }
  }

    
</script>

<style scoped>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
