<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopState } from './state/stopStates';
const { stops, loading, message, loadStops } = useStopState()

onMounted(() => {
    loadStops()
    console.log(stops)
})


</script>

<template>
<div v-for="stop in stops" :key="stop.id">
    {{ stop.name }} <img v-if="stop.image_url" :src="stop.image_url" alt="stop.name">
</div>
</template>
