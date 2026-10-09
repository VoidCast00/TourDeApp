<script setup lang="ts">
import { ref } from 'vue'




import { onMounted,computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop } = useStopState()
const input = ref('')
console.log(stops)


</script>

<template>
<div class="flex">
<form @submit.prevent="addNewStop">
    <input v-model="newStop.name" placeholder="stop name" required><br>
    <input v-model="newStop.lines" placeholder="lines (A;B)"><br>
    <input v-model="newStop.transfer_lines" placeholder="transfer lines (A;B)"><br>
    <input v-model.number="newStop.x" type="number" placeholder="x"><br>
    <input v-model.number="newStop.y" type="number" placeholder="y"><br>
    <input v-model="newStop.image_url" placeholder="image url"><br>
    
    <label><input v-model="newStop.is_transfer" type="checkbox"> transfer</label><br>
    
    <label><input v-model="newStop.wheelchair_accessible" type="checkbox"> wheelchair</label><br>
    
    <label><input v-model="newStop.has_shelter" type="checkbox"> shelter</label><br>
    <label><input v-model="newStop.has_bench" type="checkbox"> bench</label><br>
    <label><input v-model="newStop.has_ticket_machine" type="checkbox"> ticket machine</label><br>
    <label><input v-model="newStop.has_display" type="checkbox"> display</label><br>

    <button type="submit">add stop</button>
    <p>{{ addMessage }}</p>
</form>
</div>


</template>

<style>

.flex{
    display:flex;
    justify-content: center;
    align-items: center;
    
}

</style>