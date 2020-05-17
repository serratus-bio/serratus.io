<template>
  <div class="flex flex-col justify-center items-center bg-white" style="height: 100vh">
    <h1 class="text-5xl text-black font-semibold text-center">Why Serratus?</h1>
    <h1 class="text-xl text-black font-light text-center mt-12 w-3/4 lg:w-3/5">
      <strong>The world needs us.</strong> We are currently in a pandemic and we are ill-equiped.
      The quality of the sequencing data available for SARS-Cov-2 (Covid-19) is not in good condition, with only 12% of coronaviruses having complete genomes.
      It is also likely that many more viruses in the same family have yet to be discovered.
      Serratus is here to help, but how?
    </h1>
    <iframe width="640" height="360" class="mt-12" src="https://www.youtube.com/embed/MtZk7JEOzus" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <!-- <youtube class="mt-12" :video-id="MtZk7JEOzus"></youtube> -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueYouTubeEmbed, {YouTubePlayer} from 'vue-youtube-embed'
// Vue.use(VueYouTubeEmbed, {global: false})
export default {
  props: {
    msg: String
  },
  components: {
    // youtube: YouTubePlayer
  }
};
</script>

<style scoped>
</style>
