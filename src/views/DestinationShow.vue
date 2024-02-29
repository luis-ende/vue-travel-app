<template>
  <div>
    <section v-if="destination" class="destination">
    <h1>{{ destination.name }}</h1>
    <GoBack />
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" alt="destination.name">
      <p>{{ destination.description }}</p>
    </div>
    </section>
    <section class="experiences">
      <router-view />  
      <h2>Top Experiences in {{ destination.name }}</h2>
      <div class="cards">
        <router-link 
          v-for="experience in destination.experiences"
          :key="experience.slug"
          :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
        >
          <ExperienceCard         
            :experience="experience"        
          />
        </router-link>
        
      </div>    
    </section>
  </div>  
</template>

<script>

import sourceData from '@/data.json'
import ExperienceCard from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'

export default {
  components: { 
    ExperienceCard, 
    GoBack 
  },
/*   data(){
    return {
      destination: null
    }
  }, */
  props: {
    id: {type: Number, required: true}
  },
  computed: {
    /* destinationId(){
      return parseInt(this.$route.params.id)
    }, */
    destination(){
      return sourceData.destinations.find(
        (destination) => destination.id === this.id
      );
    }

    /* destination(){
      return sourceData.destinations.find(destination => destination.id === this.destinationId)
    } */
  }, 

  // Fetching from API...
 /*  async created(){    
    const response = await fetch(`/api/${this.$route.params.slug}.json`);    
    this.destination = await response.json();    

  } */
}
</script>