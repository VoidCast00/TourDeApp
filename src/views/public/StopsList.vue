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
    <body>
        
    
<div class="content">
<input placeholder="search for stop" v-model="input"/>
<p v-if="loading">loading stops...</p>
<p v-else-if="message">{{ message }}</p>
<p v-else-if="filteredStops.length === 0">there are no stops yet</p>
<div class="grid" v-else>
    <div v-for="stop in filteredStops" :key="stop.id" >
        <RouterLink class="stop" :to="{ name: 'Detail', params: { id: stop.id } }">
            <h2>{{ stop.name }}</h2>
            <img
             v-if="stop.image_url"
             :src="stop.image_url"
             :alt="stop.name"
             loading="lazy">
             
        </RouterLink>
    </div>
</div>
</div>
</body>
</template>
<style scoped>
.stop{
    
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    text-decoration: none;
    color: black;
    border: 2px solid  #0257A5;
    border-radius: 50px;
    padding: 3%;
    margin: 2%;
    background-color: #0257A5;
    
    
    
}
.content{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    
    
}
img{
 width: 50%;
 height: auto;
 border-radius: 50px;
}
.grid{   
    margin: 1%;
}

</style>
