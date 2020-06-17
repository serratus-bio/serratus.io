<template>
  <div class="flex flex-col w-full">
    <Home id="home" />
    <Why id="about" />
    <Info id="info" />
  </div>
</template>

<script>
import Home from "../pages/Home.vue";
import Why from "../pages/Why.vue";
import Info from "../pages/Info.vue";

export default {
  components: {
    Home,
    Why,
    Info
  }
};
</script>

<style>
</style>