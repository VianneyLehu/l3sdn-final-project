import { store } from 'quasar/wrappers'
import { defineStore } from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => ({ log : []}),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      registerUser(firstname,name, email, phone, password) {
        // i want to push the data to the state like firstname : 'firstname', name : 'name', email : 'email', phone : 'phone', password : 'password'
        // For example if i want to get the firstname i will do store.state.login.firstname but if another one want to register then that push another data to the state
        this.log.push({ firstname : firstname, name : name, email : email, phone : phone, password : password })
        
        
      },
        loginUser(emailphone, password) {
          this.log.forEach(element => {
            if ((element.email == emailphone || element.phone == emailphone) && element.password == password) {
              return true
          } else {
              return false
          }
          });
            
        },

    },
  })
