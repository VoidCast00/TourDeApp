<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loadStops } = useStopState()

onMounted(() => {
    loadStops()
})
</script>

<template>
<div class="page">
    <div class="page-top">
        <h1 class="page-title">Admin</h1>
    </div>

    <div class="cards">
        <div class="panel count">
            <span class="number">{{ stops.length }}</span>
            <span>stops in the system</span>
        </div>

        <RouterLink to="/admin/stops" class="panel link-card">
            <h2>Manage stops</h2>
            <p>Search, edit or delete existing stops.</p>
        </RouterLink>

        <RouterLink to="/admin/create" class="panel link-card">
            <h2>Add a stop</h2>
            <p>Create a new stop with its lines and facilities.</p>
        </RouterLink>
    </div>
</div>
</template>

<style scoped>
.cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 750px) {
    .cards {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--blue);
    border-color: var(--blue);
    color: var(--white);
}

.number {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    color: var(--green);
}

.link-card {
    text-decoration: none;
    color: var(--text);
    border-left: 4px solid var(--green);
}

.link-card:hover {
    border-color: var(--blue);
}

.link-card h2 {
    color: var(--blue-dark);
}

.link-card p {
    margin: 0;
    color: var(--text-light);
}
</style>
