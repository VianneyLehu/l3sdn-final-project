import { store } from 'quasar/wrappers'
import { defineStore } from 'pinia'
import  users  from '../data/users.json'
import { api } from 'boot/axios'




export const useLoginStore = defineStore('login', {
    state: () => ({ currentUser: null }),
    getters: {
      getCurrentUser() {
        return this.currentUser
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
          console.log('test')
          const managedEmployees = []
          for (const employee of api) {
            if (employee.role === 2) {
              console.log(employee)
              managedEmployees.push(employee)
            }
        }
        return managedEmployees
      }
    },
    getAllManagers(api) {
      const managers = []
      for (const employee of api) {
        if (employee.role === 1) {
          managers.push(employee)
        }
      }
      return managers
    }
    },
    actions: {

      updateManagerManagedEmployees(manager, managedEmployee,api) {

        console.log('manager:',manager)
        for (const employee of api) {
          if (employee.id === manager) {
            employee.manage.push(managedEmployee)
          }
        }
      },
      updateManager(updatedManager,api) {

        
        const managerIndex = api.find(emp => emp.id === updatedManager.id)
        api[managerIndex] = updatedManager
      },
      registerUser(firstname,name, email, phone, password, selected,api) {
        
        // Trouver le dernier ID dans le fichier JSON
        const lastidplus1 = api[api.length - 1].id + 1

        
        if(selected == null) {
          api.push({id: lastidplus1, firstname : firstname, lastname : name, email : email, phone : phone, password : password, role : '2', manage : [] })
        }

        else {
          
          api.push({id: lastidplus1, firstname : firstname, lastname : name, email : email, phone : phone, password : password, role : '2', manage : [] })
          this.updateManagerManagedEmployees(selected, lastidplus1,api)
        }

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
