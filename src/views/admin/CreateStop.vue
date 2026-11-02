<script setup lang="ts">

import { ref } from 'vue'




import { onMounted,computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop } = useStopState()
const input = ref('')
console.log(stops)




</script>

<template>
<div class="page narrow">
    <RouterLink to="/admin/stops" class="back-link">← Manage stops</RouterLink>
    <div class="page-top">
        <h1 class="page-title">Add a stop</h1>
    </div>

    <form class="panel form" @submit.prevent="addNewStop">
        <h2>Details</h2>

        <label class="field">
            <span>Name</span>
            <input v-model="newStop.name" placeholder="e.g. Turing Terminal" required>
        </label>

        <div class="form-row">
            <label class="field">
                <span>Lines</span>
                <input v-model="newStop.lines" placeholder="A;B">
                <small>Separate lines with ;</small>
            </label>
            <label class="field">
                <span>Transfer lines</span>
                <input v-model="newStop.transfer_lines" placeholder="C;D">
            </label>
        </div>

        <div class="form-row">
            <label class="field">
                <span>Position X</span>
                <input v-model.number="newStop.x" type="number">
            </label>
            <label class="field">
                <span>Position Y</span>
                <input v-model.number="newStop.y" type="number">
            </label>
        </div>

        <label class="field">
            <span>Image URL</span>
            <input v-model="newStop.image_url" placeholder="/images/stops/...">
        </label>

        <h2>Facilities</h2>
        <div class="checks">
            <label><input v-model="newStop.is_transfer" type="checkbox"> Transfer stop</label>
            <label><input v-model="newStop.wheelchair_accessible" type="checkbox"> Step-free</label>
            <label><input v-model="newStop.has_shelter" type="checkbox"> Shelter</label>
            <label><input v-model="newStop.has_bench" type="checkbox"> Bench</label>
            <label><input v-model="newStop.has_ticket_machine" type="checkbox"> Ticket machine</label>
            <label><input v-model="newStop.has_display" type="checkbox"> Display</label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn">Add stop</button>
            <p class="form-message">{{ addMessage }}</p>
        </div>
    </form>
</div>
</template>

<style scoped>
.narrow {
    max-width: 760px;
}
</style>
