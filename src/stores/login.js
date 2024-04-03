import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'


export const useLoginStore = createPinia('login', {
    state: () => ({}),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      registerUser(firstname,name, email, phone, password) {
        store.state.login.firstname = firstname;
        store.state.login.name = name;
        store.state.login.email = email;
        store.state.login.password = password;
        store.state.login.phone = phone;
      },
        loginUser(emailphone, password) {
            if ((store.state.login.email == emailphone || store.state.login.emailphone == phone) && store.state.login.password == password) {
                return true;
            } else {
                return false;
            }
        },

    },
  })
