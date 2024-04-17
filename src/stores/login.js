import { store } from 'quasar/wrappers'
import { defineStore } from 'pinia'
import  users  from '../data/users.json'


export const useLoginStore = defineStore('login', {
    state: () => ({ currentUser: null }),
    getters: {
      getCurrentUser() {
        return this.currentUser
      },

      getManagedEmployees() {
        if (this.currentUser.role === 1) {
        // Gérer les employés pour le manager
          const managedEmployees = []
          for (const employeeId of this.currentUser.manage) {
            console.log(employeeId)
            const employee = users.find(emp => emp.id === employeeId)
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
          for (const employee of users) {
            if (employee.role === 2) {
              console.log(employee)
              managedEmployees.push(employee)
            }
        }
        return managedEmployees
      }
    },
    getAllManagers() {
      const managers = []
      for (const employee of users) {
        if (employee.role === 1) {
          managers.push(employee)
        }
      }
      return managers
    }
    },
    actions: {

      updateManagerManagedEmployees(manager, managedEmployee) {
        // Recherchez le manager à mettre à jour dans le fichier JSON
        console.log('manager:',manager)
        for (const employee of users) {
          if (employee.id === manager) {
            employee.manage.push(managedEmployee)
          }
        }
      },
      updateManager(updatedManager) {
        // Recherchez le manager à mettre à jour dans le fichier JSON
        
        const managerIndex = users.findIndex(emp => emp.id === updatedManager.id)
        users[managerIndex] = updatedManager
      },
      registerUser(firstname,name, email, phone, password, selected) {
        
        // Trouver le dernier ID dans le fichier JSON
        const lastidplus1 = users[users.length - 1].id + 1

        // i want to push the data to the state like firstname : 'firstname', name : 'name', email : 'email', phone : 'phone', password : 'password'
        // For example if i want to get the firstname i will do store.state.login.firstname but if another one want to register then that push another data to the state
        if(selected == null) {
          users.push({id: lastidplus1, firstname : firstname, lastname : name, email : email, phone : phone, password : password, role : '2', manage : [] })
        }
        else {
          
          users.push({id: lastidplus1, firstname : firstname, lastname : name, email : email, phone : phone, password : password, role : '2', manage : [] })
          this.updateManagerManagedEmployees(selected, lastidplus1)
        }

      },
        loginUser(emailphone, password) {
          for (const element of users) { 
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
