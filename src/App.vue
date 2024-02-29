<script>
  import TheNavigation from '@/components/TheNavigation.vue'

  export default{
    components: {TheNavigation}
  }
</script>

<template>    
  <TheNavigation />   

  <div class="container">    
      <!-- Set the key attribute to force view to always recreate the component -->
      <router-view 
        v-slot="{Component}"        
        class="view left-sidebar" 
        name="LeftSidebar">
        <transition name="slide" mode="out-in">
          <component 
            :is="Component"
            :key="$route.path"
          ></component>
        </transition>
      </router-view>

      <router-view 
        v-slot="{Component}"        
        class="main-view"
      >
        <transition name="slide" mode="out-in">
        <!-- <transition name="moveUp" > -->
          <component 
            :is="Component"
            :key="$route.path"
          ></component>
        </transition>
      </router-view>      
  </div>  
</template>

<style lang="css">
  /* .moveUp-enter-active {
    animation: fadeIn 1s ease-in;
  }

  @keyframes fadeIn {
    0% { opacity: 0 }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
  }

  @keyframes moveUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-400px); }
  } */


  .slide-enter-active,
  .slide-leave-active{
    /* transition: opacity 1s, transform 1s; */
    transition: opacity 0.3s;
  }
  .slide-enter-from,
  .slide-leave-to{
    opacity: 0;
    /* transform: translateX(-30%); */
  }

  .container{
    display: flex;
  }
  .left-sidebar{
    width: 20%;
  }
  .main-view{
    width: 100%;
  }
</style>