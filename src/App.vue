<script setup lang="ts">
import {ref, onMounted} from 'vue'

const Status = ref()

onMounted(async () => {
  const res = await fetch("/api/v1/health")  //

  Status.value = await res.json()

})

</script>

<template>
  <h2 v-if="Status"> Status: {{ Status.status }}</h2>
</template>

<style scoped></style>
