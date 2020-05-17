<template>          
  <header class="text-gray-700 body-font top-0 fixed w-full bg-white shadow-lg">
    <div class="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src="../assets/images/serrlogo.png" class="w-8 h-8"/>
        <span class="ml-3 text-xl">Serratus</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <!-- <router-link class="mr-16 hover:text-gray-900" to="/">Home</router-link> -->
      <div v-scroll-to="'#home'" class="mr-16 hover:text-gray-900 cursor-pointer" >Home</div>
      <div v-scroll-to="'#about'" class="mr-16 hover:text-gray-900 cursor-pointer" >About</div>
      <div v-scroll-to="'#info'" class="hover:text-gray-900 cursor-pointer" >Info</div>
      
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
