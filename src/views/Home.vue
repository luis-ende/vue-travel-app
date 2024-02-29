<template>
  <div class="home">
    <h1>All destinations</h1>
    <button @click="triggerRouterError">Trigger Router Error</button>

    <!-- Dynamic route example -->
    <button @click="addDynamicRoute">Add Dynamic Route</button>
    <router-link to="/dynamic">Visit Dynamic Link</router-link>

    <div class="destinations">
      <router-link 
        v-for="destination in destinations"
        :key="destination.id"
        :to="{name: 'destination.show', params:{id: destination.id, slug: destination.slug}}"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name">
      </router-link>
    </div>
    
  </div>
</template>

<script>
import sourceData from '@/data.json'
import { isNavigationFailure, NavigationFailureType } from 'vue-router'

export default {
  data() {
    return {
      destinations: sourceData.destinations
    }    
  },
  methods: {
      async triggerRouterError() {
        const navitagionFailure = await this.$router.push('/')
        if (isNavigationFailure(navitagionFailure, NavigationFailureType.duplicated)) {
          // Detecting navigation failures: information we get about the failure
          console.log(navitagionFailure.to)
          console.log(navitagionFailure.from)
        } else {

        }
      },

      addDynamicRoute() {
        this.$router.addRoute({
          name: "dynamic",
          path: "/dynamic",
          component: () => import("@/views/Login.vue")
        })        

        // to remove route:
        // this.$router.removeRoute("dynamic")
      }    
  }
}

</script>