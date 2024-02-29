<script>

import sourceData from '@/data.json'
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            destinations: sourceData.destinations
        };
    },
    components: { RouterLink }
}
</script>

<template>
  <div id="nav">
    <AppLink id="logo" to="/">
      Travel App
    </AppLink>
    <AppLink
      v-for="destination in destinations"
      :key="destination.id"
      :to="{name: 'destination.show', params:{id: destination.id, slug: destination.slug}}">
      {{ destination.name }}
    </AppLink>    
    <AppLink :to="{name: 'protected'}">Dashboard</AppLink>
    <AppLink to="https://google.com">To Google</AppLink>
  </div>  
</template>

<style lang="css">
  #nav .travel-app-active-link{
    color: yellow;
    border-bottom: 2px solid yellow;
  }
</style>