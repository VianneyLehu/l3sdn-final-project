<template>
  <div>
    <navbar></navbar> 
  </div>
</template>

<script>
import Navbar from 'src/components/NavbarVue.vue' 

export default {
  name: 'MainLayout',
  components: {
    Navbar 
  }
}
</script>