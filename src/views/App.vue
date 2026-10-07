<script setup lang="ts">
import { ref } from 'vue'
import { addStop } from '@/api/stopsApi'

const name = ref('')
const message = ref('')

async function submit() {
    try {
        await addStop(name.value)
        message.value = "stop added"
        name.value = ''
    } catch (err) {
        console.error("failed to add stop: ", err)
        message.value = "could not add stop"
    }
}
</script>

<template>
<form @submit.prevent="submit">
    <input v-model="name" placeholder="stop name" required>
    <button type="submit">add stop</button>
    <p>{{ message }}</p>
</form>
<router-view/>
</template>
