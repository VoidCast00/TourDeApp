<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <SearchBar />
    <main class="w-full flex-1 px-4 py-4 lg:px-6">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
