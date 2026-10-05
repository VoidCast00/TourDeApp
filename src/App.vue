<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopState } from './state/stopStates';
const { stops, loading, message, loadStops } = useStopState()

onMounted(() => {
    loadStops()
})


</script>

<template>
<div v-for="stop in stops">
    {{ stop.name }} {{ stop.image_url }}
</div>
</template>
