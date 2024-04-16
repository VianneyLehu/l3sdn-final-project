import { store } from 'quasar/wrappers'
import { defineStore } from 'pinia'
import { users } from '../data/users.json'


export const useLoginStore = defineStore('login', {
    state: () => ({ currentUser: null }),
    getters: {
    },
    actions: {
      registerUser(firstname,name, email, phone, password) {

        // i want to push the data to the state like firstname : 'firstname', name : 'name', email : 'email', phone : 'phone', password : 'password'
        // For example if i want to get the firstname i will do store.state.login.firstname but if another one want to register then that push another data to the state
        users.employees.push({ firstname : firstname, lastname : name, email : email, phone : phone, password : password, role : '1', manage : [] })
        
      },
        loginUser(emailphone, password) {
          users.employees.forEach(element => {
            if ((element.email == emailphone || element.phone == emailphone) && element.password == password) {
              console.log('Login success')
              this.currentUser = element
              return true
          } 
          
          })
          console.log('Login failed')
          return false 
        },
        logoutUser() {
          this.currentUser = null
        }

    },
  })
