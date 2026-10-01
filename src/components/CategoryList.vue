<script setup lang="ts">
import { useRoute } from 'vue-router'
import { categories, listings } from '@/data/placeholder'
import { categoryColor } from '@/data/categoryColors'

const route = useRoute()

// TODO: counts should come from the api
function countIn(slug: string) {
  return listings.filter((l) => l.category === slug).length
}

function rowClass(active: boolean) {
  return active
    ? 'border-primary bg-blue-50 font-semibold text-primary'
    : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-primary'
}
</script>

<template>
  <nav class="box">
    <div class="box-head">Categories</div>
    <ul class="divide-y">
      <li>
        <RouterLink
          :to="{ path: '/', query: { ...route.query, category: undefined } }"
          class="flex items-center gap-2 border-l-2 px-3 py-1.5"
          :class="rowClass(!route.query.category)"
        >
          <span class="h-2 w-2 rounded-full bg-primary"></span>
          <span class="flex-1">All categories</span>
          <span class="text-xs font-normal text-gray-400">{{ listings.length }}</span>
        </RouterLink>
      </li>
      <li v-for="c in categories" :key="c.slug">
        <RouterLink
          :to="{ path: '/', query: { ...route.query, category: c.slug } }"
          class="flex items-center gap-2 border-l-2 px-3 py-1.5"
          :class="rowClass(route.query.category === c.slug)"
        >
          <span class="h-2 w-2 rounded-full" :class="categoryColor(c.slug).dot"></span>
          <span class="flex-1">{{ c.name }}</span>
          <span class="text-xs font-normal text-gray-400">{{ countIn(c.slug) }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
