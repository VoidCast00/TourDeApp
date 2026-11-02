<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Stop } from '@shared/types'
import { fetchStop } from '@/api/stopsApi'

const route = useRoute()
const stop = ref<Stop | null>(null)
const messageError = ref('')

onMounted(async () => {
    try {
        stop.value = await fetchStop(Number(route.params.id))
    } catch (err) {
        console.error("failed to get stop: ", err)
        messageError.value = "could not load this stop"
    }
})
</script>

<template>
<div class="page">
    <RouterLink to="/stops" class="back-link">← All stops</RouterLink>

    <p v-if="messageError" class="status error">{{ messageError }}</p>

    <div v-else-if="stop">
        <div class="panel top">
            <img v-if="stop.image_url" class="photo" :src="stop.image_url" :alt="stop.name">
            <div v-else class="photo no-photo">No photo</div>

            <div class="info">
                <h1 class="page-title">{{ stop.name }}</h1>

                <h3>Lines</h3>
                <div class="lines">
                    <span v-for="line in stop.lines.split(';')" :key="line" class="line-badge">{{ line }}</span>
                </div>

                <div v-if="stop.is_transfer && stop.transfer_lines">
                    <h3>Transfer to</h3>
                    <div class="lines">
                        <span v-for="line in stop.transfer_lines.split(';')" :key="line" class="line-badge transfer">{{ line }}</span>
                    </div>
                </div>

                <p class="coords">Position: {{ stop.x }}, {{ stop.y }}</p>
            </div>
        </div>

        <div class="panel">
            <h2>Facilities</h2>
            <ul class="facilities">
                <li :class="{ yes: stop.wheelchair_accessible }">
                    <span class="dot"></span> Step-free access
                    <strong>{{ stop.wheelchair_accessible ? 'Yes' : 'No' }}</strong>
                </li>
                <li :class="{ yes: stop.has_shelter }">
                    <span class="dot"></span> Shelter
                    <strong>{{ stop.has_shelter ? 'Yes' : 'No' }}</strong>
                </li>
                <li :class="{ yes: stop.has_bench }">
                    <span class="dot"></span> Bench
                    <strong>{{ stop.has_bench ? 'Yes' : 'No' }}</strong>
                </li>
                <li :class="{ yes: stop.has_ticket_machine }">
                    <span class="dot"></span> Ticket machine
                    <strong>{{ stop.has_ticket_machine ? 'Yes' : 'No' }}</strong>
                </li>
                <li :class="{ yes: stop.has_display }">
                    <span class="dot"></span> Departure display
                    <strong>{{ stop.has_display ? 'Yes' : 'No' }}</strong>
                </li>
            </ul>
        </div>
    </div>

    <p v-else class="status">Loading...</p>
</div>
</template>

<style scoped>
/* photo on the left, info on the right (stacked on phones) */
.top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

@media (min-width: 750px) {
    .top {
        grid-template-columns: 1fr 1fr;
    }
}

.photo {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: var(--radius);
}

.no-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg);
    color: var(--text-light);
    font-weight: 600;
}

.info h3 {
    margin: 1.2rem 0 0.5rem;
    font-size: 1rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.coords {
    margin: 1.2rem 0 0;
    color: var(--text-light);
}

.panel h2 {
    color: var(--blue-dark);
}

.facilities {
    list-style: none;
    margin: 0;
    padding: 0;
}

.facilities li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--border);
}

.facilities li:last-child {
    border-bottom: none;
}

.facilities strong {
    margin-left: auto; /* pushes Yes/No to the right */
    color: var(--text-light);
}

.dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--border);
}

/* when the stop has the facility, the dot is green */
.facilities li.yes .dot {
    background-color: var(--teal);
}

.facilities li.yes strong {
    color: var(--text);
}
</style>
