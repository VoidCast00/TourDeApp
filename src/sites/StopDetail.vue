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
<RouterLink to="/stops">back to all stops</RouterLink>
<p v-if="message">{{ message }}</p>
<div v-else-if="stop">
    <h1>{{ stop.name }}</h1>
    <img v-if="stop.image_url" :src="stop.image_url" :alt="stop.name" width="300" height="300">
    <p>lines: {{ stop.lines }}</p>
</div>
<p v-else>loading...</p>
</template>
