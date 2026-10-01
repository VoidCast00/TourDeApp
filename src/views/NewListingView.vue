<script setup lang="ts">
import { reactive, ref } from 'vue'
import { categories } from '@/data/placeholder'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'

const form = reactive({
  title: '',
  category: '',
  price: '',
  city: '',
  description: '',
})
const sent = ref(false)

// TODO: send to the api (and require login)
function submit() {
  console.log('new listing', { ...form })
  sent.value = true
}
</script>

<template>
  <form class="box mx-auto max-w-3xl" @submit.prevent="submit">
    <div class="box-head">Post a listing</div>

    <div class="grid gap-3 p-3 sm:grid-cols-2">
      <label class="block sm:col-span-2">
        <span class="label">Title</span>
        <input v-model="form.title" required maxlength="80" placeholder="e.g. Apartment cleaning, same day" class="input" />
      </label>

      <label class="block">
        <span class="label">Category</span>
        <select v-model="form.category" required class="input">
          <option value="" disabled>Choose...</option>
          <option v-for="c in categories" :key="c.slug" :value="c.slug">{{ c.name }}</option>
        </select>
      </label>

      <label class="block">
        <span class="label">Price</span>
        <input v-model="form.price" placeholder="e.g. 20 €/h or Negotiable" class="input" />
      </label>

      <label class="block sm:col-span-2">
        <span class="label">City / ZIP</span>
        <input v-model="form.city" required class="input" />
      </label>

      <label class="block sm:col-span-2">
        <span class="label">Description</span>
        <textarea v-model="form.description" required rows="6" class="input resize-y"></textarea>
      </label>

      <!-- TODO: real file upload -->
      <div class="sm:col-span-2">
        <span class="label">Photos (optional)</span>
        <div class="grid grid-cols-4 gap-2">
          <button
            type="button"
            class="flex aspect-square cursor-pointer flex-col items-center justify-center border-2 border-dashed border-blue-200 bg-blue-50 text-xs text-primary hover:border-primary"
          >
            <span class="text-xl leading-none">+</span>
            Add photo
          </button>
          <ImagePlaceholder v-for="n in 3" :key="n" class="aspect-square" />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3 border-t bg-gray-50 px-3 py-2">
      <span v-if="sent" class="text-xs text-gray-600">Not saved yet, the api isn't wired up (see console).</span>
      <span v-else class="text-xs text-gray-500">Listings are free and stay up for 30 days.</span>
      <button type="submit" class="btn">Publish</button>
    </div>
  </form>
</template>
