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

        
    
<div class="content">
    <div class="search">
<img class="searchIcon" src="/images/icons/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
<input class="searchInput" placeholder="search for stop" v-model="input"/>
    </div>
<p v-if="loading">loading stops...</p>
<p v-else-if="message">{{ message }}</p>
<p v-else-if="filteredStops.length === 0">there are no stops yet</p>
<div class="grid" v-else>
    <div v-for="stop in filteredStops" :key="stop.id" >
        <RouterLink class="stop" :to="{ name: 'Detail', params: { id: stop.id } }">
            <h2 class="text">{{ stop.name }}</h2>
            <img class="stopImg"
             v-if="stop.image_url"
             :src="stop.image_url"
             :alt="stop.name"
             loading="lazy">
             
        </RouterLink>
    </div>
</div>
</div>


</template>
<style scoped>

.stop{
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    text-decoration: none;
    color: black;
    border-radius: 20px;
    padding: 0%;
    margin: 2% 0% 0% 0%;
    background-color: #0070BB;
}

.content{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    background-color: #0257A5;
    
}

.stopImg{
 width: 35%;
 height: auto;
 border-radius: 0px;
 
}

.grid{   
    margin: 1%;
}

.text{
    font-size: clamp(1em, 2.5vw, 2rem);
    
}
.search{
    margin-top: 4%;
    margin-bottom: 1%;
    display:flex;
    flex-direction: row;
    
    align-items: flex-start;
    justify-content: flex-start;
    padding:1%;
    width: 20%;
    border-radius: 30px;
    background: #FFFFFF;
}
.searchInput{
    font-size: clamp(1em, 1.25vw, 1rem);

    
    outline: none;
    border: none;
    background: transparent;
    

}
.searchIcon{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
}



</style>
