<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Stop } from '@shared/types'
import { fetchStop } from '@/api/stopsApi'

const route = useRoute()
const stop = ref<Stop | null>(null)
const messageError = ref('')
const saveMessage = ref('')

onMounted(async () => {
    try {
        stop.value = await fetchStop(Number(route.params.id))
    } catch (err) {
        console.error("failed to get stop: ", err)
        messageError.value = "could not load this stop"
    }
})

async function saveStop() {
    // TODO: call updateStop(...) here and set saveMessage
}
</script>

<template>
<div class="page narrow">
    <RouterLink to="/admin/stops" class="back-link">← Manage stops</RouterLink>
    <div class="page-top">
        <h1 class="page-title">Edit stop</h1>
    </div>

    <p v-if="messageError" class="status error">{{ messageError }}</p>

    <form v-else-if="stop" class="panel form" @submit.prevent="saveStop">
        <h2>Details</h2>

        <label class="field">
            <span>Name</span>
            <input v-model="stop.name" required>
        </label>

        <div class="form-row">
            <label class="field">
                <span>Lines</span>
                <input v-model="stop.lines" placeholder="A;B">
                <small>Separate lines with ;</small>
            </label>
            <label class="field">
                <span>Transfer lines</span>
                <input v-model="stop.transfer_lines" placeholder="C;D">
            </label>
        </div>

        <div class="form-row">
            <label class="field">
                <span>Position X</span>
                <input v-model.number="stop.x" type="number">
            </label>
            <label class="field">
                <span>Position Y</span>
                <input v-model.number="stop.y" type="number">
            </label>
        </div>

        <label class="field">
            <span>Image URL</span>
            <input v-model="stop.image_url" placeholder="/images/stops/...">
        </label>

        <h2>Facilities</h2>
        <div class="checks">
            <label><input v-model="stop.is_transfer" type="checkbox"> Transfer stop</label>
            <label><input v-model="stop.wheelchair_accessible" type="checkbox"> Step-free</label>
            <label><input v-model="stop.has_shelter" type="checkbox"> Shelter</label>
            <label><input v-model="stop.has_bench" type="checkbox"> Bench</label>
            <label><input v-model="stop.has_ticket_machine" type="checkbox"> Ticket machine</label>
            <label><input v-model="stop.has_display" type="checkbox"> Display</label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn">Save changes</button>
            <RouterLink to="/admin/stops" class="btn-outline">Cancel</RouterLink>
            <p class="form-message">{{ saveMessage }}</p>
        </div>
    </form>

    <p v-else class="status">Loading...</p>
</div>
</template>

<style scoped>
.narrow {
    max-width: 760px;
}
</style>
