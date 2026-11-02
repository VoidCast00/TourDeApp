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
<div class="page">
    <RouterLink to="/admin" class="back-link">← Admin</RouterLink>

    <div class="page-top">
        <h1 class="page-title">Manage stops</h1>
        <div class="tools">
            <input placeholder="Search for a stop..." v-model="input"/>
            <RouterLink to="/admin/create" class="btn">Add stop</RouterLink>
        </div>
    </div>

    <p class="status" v-if="loading">Loading stops...</p>
    <p class="status error" v-else-if="messageReport">{{ messageReport }}</p>
    <p class="status" v-else-if="filteredStops.length === 0">There are no stops yet.</p>

    <ul class="panel list" v-else>
        <li v-for="stop in filteredStops" :key="stop.id" class="row">
            <img
                v-if="stop.image_url"
                class="thumb"
                :src="stop.image_url"
                :alt="stop.name"
                loading="lazy">
            <div v-else class="thumb"></div>

            <div class="row-info">
                <RouterLink :to="{ name: 'Detail', params: { id: stop.id } }" class="name">{{ stop.name }}</RouterLink>
                <div class="lines">
                    <span v-for="line in stop.lines.split(';')" :key="line" class="line-badge small">{{ line }}</span>
                </div>
            </div>

            <div class="row-actions">
                <RouterLink :to="{ name: 'Edit', params: { id: stop.id } }" class="btn-outline">Edit</RouterLink>
                <button class="btn-danger" @click="deleteTargetedStop(stop.id)">Delete</button>
            </div>
        </li>
    </ul>
</div>
</template>

<style scoped>
.tools {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    max-width: 420px;
}

.list {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* one stop per row: picture, name + lines, buttons */
.row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--border);
}

.row:last-child {
    border-bottom: none;
}

.thumb {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 8px;
    background-color: var(--bg);
}

.row-info {
    flex: 1;
    min-width: 150px;
}

.name {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    margin-bottom: 0.3rem;
}

.name:hover {
    color: var(--blue);
}

.line-badge.small {
    min-width: 1.5rem;
    height: 1.5rem;
    font-size: 0.85rem;
}

.row-actions {
    display: flex;
    gap: 0.5rem;
}
</style>
