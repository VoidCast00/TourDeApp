<script setup lang="ts">
import { onMounted,ref,computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops } = useStopState()
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
    <div class="page-top">
        <div>
            <h1 class="page-title">Stops</h1>
            <p class="subtitle">Pick a stop to see its lines and facilities.</p>
        </div>
        <input class="search" placeholder="Search for a stop..." v-model="input"/>
    </div>

    <p class="status" v-if="loading">Loading stops...</p>
    <p class="status error" v-else-if="message">{{ message }}</p>
    <p class="status" v-else-if="filteredStops.length === 0">No stops found.</p>

    <div class="grid" v-else>
        <RouterLink
            v-for="stop in filteredStops"
            :key="stop.id"
            class="card"
            :to="{ name: 'Detail', params: { id: stop.id } }"
        >
            <img
                v-if="stop.image_url"
                class="photo"
                :src="stop.image_url"
                :alt="stop.name"
                loading="lazy">
            <div v-else class="photo no-photo">No photo</div>

            <div class="card-body">
                <h2>{{ stop.name }}</h2>

                <!-- stop.lines looks like "A;B", so split it into ["A", "B"] -->
                <div class="lines">
                    <span v-for="line in stop.lines.split(';')" :key="line" class="line-badge">{{ line }}</span>
                </div>

                <div class="chips">
                    <span v-if="stop.wheelchair_accessible" class="chip">Step-free</span>
                    <span v-if="stop.has_shelter" class="chip">Shelter</span>
                    <span v-if="stop.has_bench" class="chip">Bench</span>
                    <span v-if="stop.has_ticket_machine" class="chip">Tickets</span>
                    <span v-if="stop.has_display" class="chip">Display</span>
                </div>
            </div>
        </RouterLink>
    </div>
</div>
</template>

<style scoped>
.subtitle {
    margin: 0.2rem 0 0;
    color: var(--text-light);
}

.search {
    max-width: 320px;
}

/* 1 column on phones, 2 on tablets, 3 on bigger screens */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 600px) {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (min-width: 900px) {
    .grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.card {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden; /* keeps the photo inside the rounded corners */
    text-decoration: none;
    color: var(--text);
}

.card:hover {
    border-color: var(--blue);
}

.card:hover h2 {
    color: var(--blue);
}

.photo {
    width: 100%;
    height: 180px;
    object-fit: cover; /* fills the box without stretching the image */
    border-bottom: 4px solid var(--green);
}

.no-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg);
    color: var(--text-light);
    font-weight: 600;
}

.card-body {
    padding: 1rem;
}

.card-body h2 {
    font-size: 1.4rem;
}

.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.8rem;
}

.chip {
    color: var(--text-light);
    font-size: 0.85rem;
    padding: 0.1rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: 999px;
}
</style>
