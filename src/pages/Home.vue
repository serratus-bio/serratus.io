<template>
    <div class="h-screen flex flex-col items-center bg-blue-500 justify-center">
        <img src="@/assets/images/serratus.jpg" alt="serratus home" class="absolute top-0 h-full w-full opacity-75">
        <div class="flex flex-col z-10 items-center text-white mt-24">
            <h1 class="text-5xl font-semibold text-center">Welcome to Serratus</h1>
            <h1 class="text-xl font-light text-center">An open source, <strong> ultra-deep </strong>  search for Novel Coronaviruses.</h1>
            <!-- <a v-scroll-to="'#about'" class="border border-white  flex text-xl mt-16 justify-center items-center w-auto cursor-pointer  px-6 py-2 mt-4 rounded-md hover:text-blue-600 hover:bg-white"> 
                <div>Learn More</div></a> -->
            <svg xmlns="http://www.w3.org/2000/svg" v-scroll-to="'#about'" class="flex text-xl mt-16 justify-center items-center w-auto cursor-pointer px-6 py-2 mt-4 " width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
                
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    
</style>