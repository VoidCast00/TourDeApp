<script setup lang="ts">
import { computed } from 'vue';
import { useStopState } from "../../state/stopStates";
const { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop, updateStop } = useStopState()
const input = ref('')
console.log(stops)
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Stop } from '@shared/types'
import { fetchStop } from '@/api/stopsApi'


const stop = ref<Stop | null>(null)


</script>

<template>
<div class="formLayout">
<form>
    <div>
    <div class="textInputs">
    <input v-if="stop" v-model="stop.name" placeholder="stop name" required><br>
    <input v-if="stop" v-model="stop.lines" placeholder="lines (A;B)"><br>
    <input v-if="stop" v-model="stop.transfer_lines" placeholder="transfer lines (A;B)"><br>
    <input v-if="stop" v-model.number="stop.x" type="number" placeholder="x"><br>
    <input v-if="stop" v-model.number="stop.y" type="number" placeholder="y"><br>
    <input v-if="stop" v-model="stop.image_url" placeholder="image url"><br>
    </div>
    

    <div class="inputLabels">
    <label><input v-if="stop" v-model="stop.is_transfer" type="checkbox"> transfer</label><br>
    
    <label><input v-if="stop" v-model="stop.wheelchair_accessible" type="checkbox"> wheelchair</label><br>
    
    <label><input v-if="stop" v-model="stop.has_shelter" type="checkbox"> shelter</label><br>
    <label><input v-if="stop" v-model="stop.has_bench" type="checkbox"> bench</label><br>
    <label><input v-if="stop" v-model="stop.has_ticket_machine" type="checkbox"> ticket machine</label><br>
    <label><input v-if="stop" v-model="stop.has_display" type="checkbox"> display</label><br>
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
    border: 0px solid aqua;
    border-radius: 30px 30px 30px 30px;
    background: linear-gradient(135deg, #0070BB 0%, #91F5AD 100%);
    padding:20px;
}
.textInputs{
  display:flex;
}
</style>