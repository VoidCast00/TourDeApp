<script setup lang="ts">
// shows the image if there is one, otherwise a tinted square with an image icon
// size it from outside, e.g. <ImagePlaceholder class="h-20 w-28" />
defineProps<{ src?: string; alt?: string; tint?: string }>()
</script>

<template>
  <img v-if="src" :src="src" :alt="alt ?? ''" class="object-cover" />
  <div v-else class="flex items-center justify-center" :class="tint ?? 'bg-gray-100 text-gray-400'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-1/3 max-h-12 w-1/3 max-w-12">
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-9 9" />
    </svg>
  </div>
</template>
