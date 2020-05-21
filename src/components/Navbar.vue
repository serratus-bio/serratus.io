<template>          
  <header class="text-gray-700 body-font top-0 fixed w-full bg-white shadow-lg">
    <div class="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

        <img src="@/assets/images/logo.png" v-scroll-to="'#home'" class="w-24 h-12 cursor-pointer"/>
        <!-- <span class="ml-3 text-xl">Serratus</span> -->
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <!-- <router-link class="mr-16 hover:text-gray-900" to="/">Home</router-link> -->
      <div v-scroll-to="'#home'" class="mr-16 text-black hover:text-gray-900 cursor-pointer" >Home</div>
      <div v-scroll-to="'#about'" class="mr-16 text-black hover:text-gray-900 cursor-pointer" >About</div>
      <!-- <div v-scroll-to="'#info'" class="mr-16  text-black hover:text-gray-900 cursor-pointer" >Info</div> -->
      <a onClick="window.open(this.href); return false" href="https://github.com/ababaian/serratus" class=" text-black hover:text-gray-900 cursor-pointer" ><div   >Github</div></a>
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
logo {
  filter: invert(100%)
}

</style>
