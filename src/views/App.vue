<script setup lang="ts">
import { useStopState } from '@/state/stopStates'

const { newStop, addMessage, addNewStop } = useStopState()
</script>

<template>
<form @submit.prevent="addNewStop">
    <input v-model="newStop.name" placeholder="stop name" required>
    <input v-model="newStop.lines" placeholder="lines (A;B)">
    <input v-model="newStop.transfer_lines" placeholder="transfer lines (A;B)">
    <input v-model.number="newStop.x" type="number" placeholder="x">
    <input v-model.number="newStop.y" type="number" placeholder="y">
    <input v-model="newStop.image_url" placeholder="image url">
    <label><input v-model="newStop.is_transfer" type="checkbox"> transfer</label>
    <label><input v-model="newStop.wheelchair_accessible" type="checkbox"> wheelchair</label>
    <label><input v-model="newStop.has_shelter" type="checkbox"> shelter</label>
    <label><input v-model="newStop.has_bench" type="checkbox"> bench</label>
    <label><input v-model="newStop.has_ticket_machine" type="checkbox"> ticket machine</label>
    <label><input v-model="newStop.has_display" type="checkbox"> display</label>
    <button type="submit">add stop</button>
    <p>{{ addMessage }}</p>
</form>
<router-view/>
</template>