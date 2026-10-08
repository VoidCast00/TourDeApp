<script setup lang="ts">
import { ref } from 'vue'






const messageReport = ref('')


import { onMounted,computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop } = useStopState()
const input = ref('')
console.log(stops)


onMounted(() => {
    loadStops()
    
    
})
const filteredStops = computed(() =>{
    const search = input.value.toLowerCase().trim()
    return stops.value.filter(stop => {
    if(stop.name.toLowerCase().includes(search))
    return true;
    })
})




</script>

<template>

<input placeholder="search for stop" v-model="input"/>
<p v-if="loading">loading stops...</p>
<p v-else-if="messageReport">{{ messageReport }}</p>
<p v-else-if="filteredStops.length === 0">there are no stops yet</p>
<ul v-else>
    <li v-for="stop in filteredStops" :key="stop.id">
        <RouterLink :to="{ name: 'Detail', params: { id: stop.id } }">
            <h2>{{ stop.name }}</h2>
            <img
             v-if="stop.image_url"
             :src="stop.image_url"
             :alt="stop.name"
             loading="lazy"
             width="300" height="300">
        </RouterLink>
        <button @click="deleteTargetedStop(stop.id)">X</button>
    </li>
</ul>
</template>