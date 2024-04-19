import { store } from 'quasar/wrappers'
import { defineStore } from 'pinia'
import  users  from '../data/users.json'
import { api } from 'boot/axios'




export const useLoginStore = defineStore('login', {
    state: () => ({ currentUser: null }),
    getters: {
      getCurrentUser() {
        return this.currentUser
      }

      
    
    },
    actions: {
      getAllManagers(api) {
        const managers = []
        for (const employee of api) {
          if (employee.role === 1) {
            managers.push(employee)
          }
        }
        return managers
      },
      getManagedEmployees(api) {
        if (this.currentUser.role === 1) {
          const managedEmployees = []
          for (const employeeId of this.currentUser.manage) {
            console.log(employeeId)
            const employee = api.find(emp => emp.id === employeeId)
            console.log(employee)
            if (employee) {
              console.log(employee)
              managedEmployees.push(employee)
            }
          }
          return managedEmployees
        }
        else if (this.currentUser.role === 0) {
          
              return api.filter(employee => employee.role !== 0 && employee.role !== 1)
            
        }
        return managedEmployees
      
    },

      updateManager(updatedManager,api) {

        
        const managerIndex = api.findIndex(emp => emp.id === updatedManager.id)
        api[managerIndex] = updatedManager
      },
      
        loginUser(emailphone, password,api) {
          for (const element of api) { 
            if ((element.email == emailphone || element.phone == emailphone) && element.password == password) {
              console.log('Login success')
              this.currentUser = element
              return true
             } 
          }
          console.log('Login failed')
          return false 
        },
        logoutUser() {
          this.currentUser = null
        }

    },
  })
