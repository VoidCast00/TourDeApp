<script setup lang="ts">
import type { Listing } from '@shared/types'
import { getCategoryName } from '@/data/placeholder'
import { categoryColor } from '@/data/categoryColors'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'

defineProps<{ listings: Listing[] }>()
</script>

<template>
  <ul v-if="listings.length" class="divide-y">
    <li
      v-for="l in listings"
      :key="l.id"
      class="flex gap-3 px-3 py-3 hover:bg-blue-50/40"
      :class="{ 'bg-amber-50/50': l.featured }"
    >
      <RouterLink :to="`/listing/${l.id}`" class="shrink-0">
        <ImagePlaceholder :src="l.image" :alt="l.title" :tint="categoryColor(l.category).thumb" class="h-16 w-20 sm:h-20 sm:w-28" />
      </RouterLink>

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <span v-if="l.featured" class="rounded-sm bg-accent px-1 text-[10px] font-bold text-gray-900">TOP</span>
          <RouterLink :to="`/listing/${l.id}`" class="truncate font-semibold text-primary hover:underline">
            {{ l.title }}
          </RouterLink>
        </div>
        <p class="mt-0.5 line-clamp-2 text-gray-600">{{ l.description }}</p>
        <div class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <span class="chip" :class="categoryColor(l.category).chip">{{ getCategoryName(l.category) }}</span>
          <span>{{ l.city }}</span>
          <span>·</span>
          <span>{{ l.postedAt }}</span>
        </div>
      </div>

      <div class="shrink-0 text-right font-bold whitespace-nowrap text-emerald-700">{{ l.price }}</div>
    </li>
  </ul>
  <p v-else class="px-3 py-8 text-center text-gray-500">Nothing found. Try a different search or category.</p>
</template>
