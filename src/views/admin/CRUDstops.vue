<script setup lang="ts">
import { ref } from 'vue'





const name = ref('')
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
<form @submit.prevent="addNewStop">
    <input v-model="newStop.name" placeholder="stop name" required>
    <input v-model="newStop.lines" placeholder="lines (A;B)">
    <input v-model="newStop.transfer_lines" placeholder="transfer lines (A;B)">
    <input v-model.number="newStop.x" type="number" placeholder="x">
    <input v-model.number="newStop.y" type="number" placeholder="y">
    <input v-model="newStop.image_url" placeholder="image url">
    <label><input v-model="newStop.is_transfer" type="checkbox"> transfer</label>
    <label><input v-model="newStop.wheelchair_accessible" type="checkbox"> wheelchair</label>
    <label><input v-model="newStop.has_shelter" type="checkbox"> shelter</label>
    <label><input v-model="newStop.has_bench" type="checkbox"> bench</label>
    <label><input v-model="newStop.has_ticket_machine" type="checkbox"> ticket machine</label>
    <label><input v-model="newStop.has_display" type="checkbox"> display</label>
    <button type="submit">add stop</button>
    <p>{{ addMessage }}</p>
</form>

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