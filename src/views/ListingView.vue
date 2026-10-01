<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { listings, getCategoryName } from '@/data/placeholder'
import { categoryColor } from '@/data/categoryColors'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'

const route = useRoute()

// TODO: fetch the listing from the api by id
const listing = computed(() => listings.find((l) => l.id === Number(route.params.id)))

const showPhone = ref(false)
</script>

<template>
  <div v-if="listing">
    <!-- breadcrumb -->
    <p class="mb-3 text-xs text-gray-500">
      <RouterLink to="/" class="link">All</RouterLink>
      ›
      <RouterLink :to="{ path: '/', query: { category: listing.category } }" class="link">
        {{ getCategoryName(listing.category) }}
      </RouterLink>
      › {{ listing.title }}
    </p>

    <div class="grid gap-4 lg:grid-cols-[1fr_320px]">
      <article class="box">
        <div class="flex items-start justify-between gap-4 border-b px-3 py-3">
          <div>
            <span v-if="listing.featured" class="mr-2 rounded-sm bg-accent px-1 align-middle text-[10px] font-bold text-gray-900">TOP</span>
            <h1 class="inline align-middle text-lg leading-snug font-semibold">{{ listing.title }}</h1>
          </div>
          <span class="text-lg font-bold whitespace-nowrap text-emerald-700">{{ listing.price }}</span>
        </div>

        <!-- photos: one big + small thumbnails (TODO: real gallery) -->
        <div class="border-b p-3">
          <ImagePlaceholder :src="listing.image" :alt="listing.title" :tint="categoryColor(listing.category).thumb" class="aspect-[16/9] w-full" />
          <div class="mt-2 grid grid-cols-4 gap-2">
            <ImagePlaceholder v-for="n in 4" :key="n" class="aspect-square" />
          </div>
        </div>

        <dl class="grid grid-cols-[100px_1fr] gap-y-1.5 border-b bg-gray-50 px-3 py-2 text-xs">
          <dt class="text-gray-500">Category</dt>
          <dd><span class="chip" :class="categoryColor(listing.category).chip">{{ getCategoryName(listing.category) }}</span></dd>
          <dt class="text-gray-500">Location</dt>
          <dd>{{ listing.city }}</dd>
          <dt class="text-gray-500">Posted</dt>
          <dd>{{ listing.postedAt }}</dd>
          <dt class="text-gray-500">Listing ID</dt>
          <dd>#{{ listing.id }}</dd>
        </dl>

        <p class="px-3 py-3 leading-relaxed whitespace-pre-line">{{ listing.description }}</p>
      </article>

      <aside class="space-y-4">
        <div class="box">
          <div class="box-head">Contact</div>
          <div class="space-y-3 p-3">
            <div class="flex items-center gap-3">
              <!-- TODO: user avatar -->
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-primary">
                {{ listing.author[0] }}
              </div>
              <div>
                <p class="font-semibold">{{ listing.author }}</p>
                <p class="text-xs text-gray-500">{{ listing.city }}</p>
              </div>
            </div>
            <!-- TODO: real phone number, maybe only for logged in users -->
            <button class="btn-ghost w-full" @click="showPhone = true">
              {{ showPhone ? '+421 9xx xxx xxx' : 'Show phone number' }}
            </button>
            <!-- TODO: send message through the api -->
            <form class="space-y-2" @submit.prevent>
              <textarea rows="4" placeholder="Write a message..." class="input resize-y"></textarea>
              <button type="submit" class="btn w-full">Send message</button>
            </form>
          </div>
        </div>
        <p class="text-xs text-gray-500">
          <a href="#" class="hover:text-red-600 hover:underline">Report this listing</a>
        </p>
      </aside>
    </div>
  </div>

  <div v-else class="box px-3 py-8 text-center text-gray-500">
    Listing not found. <RouterLink to="/" class="link">Back to listings</RouterLink>
  </div>
</template>
