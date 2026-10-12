<script setup lang="ts">

import { ref } from 'vue'




import { onMounted,computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop } = useStopState()
const input = ref('')
console.log(stops)




</script>

<template>
<div class="formLayout">
<form @submit.prevent="addNewStop">
    <div>
    <div class="textInputs">
    <input v-model="newStop.name" placeholder="stop name" required>
    <input v-model="newStop.lines" placeholder="lines (A;B)">
    <input v-model="newStop.transfer_lines" placeholder="transfer lines (A;B)">
    <input v-model.number="newStop.x" type="number" placeholder="x">
    <input v-model.number="newStop.y" type="number" placeholder="y">
    <input v-model="newStop.image_url" placeholder="image url">
    </div>
    

    <div class="inputLabels">
    <label><input v-model="newStop.is_transfer" type="checkbox"> transfer</label>
    <label><input v-model="newStop.wheelchair_accessible" type="checkbox"> wheelchair</label>
    <label><input v-model="newStop.has_shelter" type="checkbox"> shelter</label>
    <label><input v-model="newStop.has_bench" type="checkbox"> bench</label>
    <label><input v-model="newStop.has_ticket_machine" type="checkbox"> ticket machine</label>
    <label><input v-model="newStop.has_display" type="checkbox"> display</label>
    </div>
    
    <div class="buttonContent">
    <button type="submit">add stop</button>
    <p>{{ addMessage }}</p>
    </div>
    
    </div>
    
</form>
</div>

</template>
<style scoped>
.formLayout{
    display:flex;
    justify-content: center;
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.buttonContent{
    display:flex;
    justify-content: center;
    align-items: center;
}
button{
    border: 2px solid #1A1A1A;
    border-radius: 5px 5px 5px 5px;
    background-color:#FFFFFF;
}
.inputLabels{
  display: flex;
  flex-direction: column;
}
form{
    
}
.textInputs{
  display:flex;
  flex-direction: column;
}
</style>