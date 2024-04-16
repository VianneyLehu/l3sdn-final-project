<template>
  <div>
    <NavBar /> <!-- Composant de la barre de navigation -->
    <router-view /> <!-- Contenu de la page -->
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue' // Importer le composant de la barre de navigation

export default {
  components: {
    NavBar // Enregistrer le composant pour pouvoir l'utiliser dans ce layout
  }
}
</script>