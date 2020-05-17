<template>
  <div class="flex flex-col justify-center items-center bg-white pt-32" style="height: 50vh">
    <h1 class="text-5xl text-black font-semibold text-center">Why Serratus?</h1>
    <h1 class="text-xl text-black font-light text-center w-3/4 lg:w-3/5 mt-8">
      <strong>The world needs us.</strong> We are currently in a pandemic and we are ill-equiped.
      The quality of the sequencing data available for SARS-Cov-2 (Covid-19) is not in good condition, with only 12% of coronaviruses having complete genomes.
      It is also likely that many more viruses in the same family have yet to be discovered.
      Serratus is here to help, but how?
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>

<style scoped>
</style>
