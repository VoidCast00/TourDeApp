<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const query = ref('')
const city = ref('')

// keep the inputs in sync with the url (back button, category links...)
watch(
  () => route.query,
  (q) => {
    query.value = String(q.q ?? '')
    city.value = String(q.city ?? '')
  },
  { immediate: true },
)

// search state lives in the url (?q=&city=&category=) so results can be shared / bookmarked
function search() {
  router.push({
    path: '/',
    query: {
      ...route.query,
      q: query.value.trim() || undefined,
      city: city.value.trim() || undefined,
    },
  })
}
</script>

<template>
  <div class="border-b border-blue-100 bg-blue-50">
    <form class="flex flex-wrap gap-2 px-4 py-2.5 lg:px-6" @submit.prevent="search">
      <input v-model="query" type="search" placeholder="What are you looking for? (e.g. plumber, cleaning)" class="input min-w-48 flex-1" />
      <input v-model="city" placeholder="City / ZIP" class="input w-full sm:w-40" />
      <button type="submit" class="btn w-full sm:w-auto">Search</button>
    </form>
  </div>
</template>
