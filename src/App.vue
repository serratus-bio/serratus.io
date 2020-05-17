<template>
  <div id="app" class="flex flex-col items-stretch">
    <Navbar class="z-10"/>

  
    <router-view></router-view>

   
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import Landing from './components/Landing.vue'
import './assets/css/tailwind.css' 

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
