<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CategoryList from '@/components/CategoryList.vue'
import ListingList from '@/components/ListingList.vue'
import { listings, getCategoryName } from '@/data/placeholder'

const route = useRoute()

const category = computed(() => route.query.category as string | undefined)

// TODO: do the filtering on the server once listings come from the api
const results = computed(() => {
  const q = String(route.query.q ?? '').toLowerCase()
  const city = String(route.query.city ?? '').toLowerCase()
  return listings.filter((l) =>
    (!category.value || l.category === category.value) &&
    (!q || `${l.title} ${l.description}`.toLowerCase().includes(q)) &&
    (!city || l.city.toLowerCase().includes(city)),
  )
})
</script>

<template>
  <div class="grid gap-4 md:grid-cols-[230px_1fr]">
    <aside class="space-y-4">
      <CategoryList />
      <div class="border border-amber-200 bg-amber-50 p-3">
        <p class="font-semibold text-amber-900">Offering a service?</p>
        <p class="mt-0.5 mb-2 text-xs text-amber-800">Reach people in your area. Posting is free.</p>
        <RouterLink to="/new" class="btn-accent w-full">+ Post a listing</RouterLink>
      </div>
    </aside>

    <section class="box">
      <div class="box-head">
        <span>
          {{ category ? getCategoryName(category) : 'Latest listings' }}
          <span class="font-normal text-blue-400 normal-case">({{ results.length }})</span>
        </span>
        <!-- TODO: hook up sorting -->
        <select class="border border-blue-200 bg-white px-1 py-0.5 text-xs font-normal text-gray-700 normal-case">
          <option>Newest first</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>

      <ListingList :listings="results" />

      <!-- TODO: real pagination -->
      <div class="flex items-center justify-between border-t px-3 py-2 text-xs text-gray-500">
        <span>Page 1 of 1</span>
        <div class="flex gap-1">
          <button class="btn-ghost px-2 py-0.5 text-xs" disabled>← Prev</button>
          <button class="btn-ghost px-2 py-0.5 text-xs" disabled>Next →</button>
        </div>
      </div>
    </section>
  </div>
</template>
