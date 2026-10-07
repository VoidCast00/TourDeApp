<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Stop } from '@shared/types'
import { fetchStop } from '@/api/stopsApi'

const route = useRoute()
const stop = ref<Stop | null>(null)
const message = ref('')

onMounted(async () => {
    try {
        stop.value = await fetchStop(Number(route.params.id))
    } catch (err) {
        console.error("failed to get stop: ", err)
        message.value = "could not load this stop"
    }
})
</script>

<template>
    <body>
        
    
<RouterLink to="/stops">back to all stops</RouterLink>
<p v-if="message">{{ message }}</p>
<div v-else-if="stop">
    
    <h1>{{ stop.name }}</h1>
    <img v-if="stop.image_url" :src="stop.image_url" :alt="stop.name" width="300" height="300">
    
    <p>lines: {{ stop.lines }}</p>
    
        
    <p v-if="stop.has_shelter">Stop has shelter</p>
    <p v-else>Stop has not shelter</p>
    
    <p v-if="stop.has_ticket_machine">Stop has ticket machine</p>
    <p v-else>Stop has not ticket machine</p>
    
    <p v-if="stop.has_bench">Stop has bench</p>
    <p v-else>Stop has not bench</p>
    
    <p v-if="stop.wheelchair_accessible">Stop is wheelchair accessible</p>
    <p v-else>Stop is not wheelchair accessible</p>
    

</div>
<p v-else>loading...</p>
</body>
</template>
