<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopState } from '../state/stopStates';
const { stops, loading, message, loadStops } = useStopState()

onMounted(() => {
    loadStops()
    console.log(stops)
})


</script>

<template>
<div v-for="stop in stops" :key="stop.id">
    <button :to="{ name: 'Detail', params: { id: stop.id } }">{{ stop.name }}</button> 
    <img
     v-if="stop.image_url"
     :src="stop.image_url"
     alt="stop.name"
     loading="lazy"
     width="300" height="300">
</div>
<router-view />
</template>
