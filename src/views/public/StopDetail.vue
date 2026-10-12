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
    <body>
        
    
<RouterLink to="/stops">back to all stops</RouterLink>
<p v-if="messageError">{{ messageError }}</p>
<div v-else-if="stop">
    
    <h1>{{ stop.name }}</h1>
    <img v-if="stop.image_url" :src="stop.image_url" :alt="stop.name" width="300" height="300">
    
    <p>lines: {{ stop.lines }}</p>
    
    <h3>Stop propeties:</h3>  
    <ul>
        <li>
    <p v-if="stop.has_shelter">Stop has shelter</p>
    <p v-else>Stop has not shelter</p>
        </li><li>
    
    <p v-if="stop.has_ticket_machine">Stop has ticket machine</p>
    <p v-else>Stop has not ticket machine</p>
        </li><li>
    
    <p v-if="stop.has_bench">Stop has bench</p>
    <p v-else>Stop has not bench</p>
        </li><li>
    <p v-if="stop.wheelchair_accessible">Stop is wheelchair accessible</p>
    <p v-else>Stop is not wheelchair accessible</p>
        </li>
    </ul> 
    

</div>
<p v-else>loading...</p>

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
</body>
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
