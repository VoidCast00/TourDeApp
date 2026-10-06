<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopState } from '../state/stopStates';
const { stops, loading, message, loadStops } = useStopState()

onMounted(() => {
    loadStops()
})
</script>

<template>
<p v-if="loading">loading stops...</p>
<p v-else-if="message">{{ message }}</p>
<p v-else-if="stops.length === 0">there are no stops yet</p>
<ul v-else>
    <li v-for="stop in stops" :key="stop.id">
        <RouterLink :to="{ name: 'Detail', params: { id: stop.id } }">
            <h2>{{ stop.name }}</h2>
            <img
             v-if="stop.image_url"
             :src="stop.image_url"
             :alt="stop.name"
             loading="lazy"
             width="300" height="300">
        </RouterLink>
    </li>
</ul>
</template>
