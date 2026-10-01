<script setup lang="ts">
import { useUserState } from '@/state/userState'

const { currentUserName } = useUserState()
</script>

<template>
  <header class="bg-primary text-white">
    <div class="flex h-12 items-center gap-3 px-4 lg:px-6">
      <RouterLink to="/" class="text-lg font-bold tracking-tight">VueJob</RouterLink>
      <span class="hidden text-xs text-blue-100 sm:inline">local services &amp; gigs</span>

      <nav class="ml-auto flex items-center gap-4">
        <span v-if="currentUserName" class="text-blue-100">
          Hi, <strong class="text-white">{{ currentUserName }}</strong>
        </span>
        <template v-else>
          <RouterLink to="/login" class="text-blue-50 hover:text-white hover:underline">Log in</RouterLink>
          <RouterLink to="/register" class="text-blue-50 hover:text-white hover:underline">Register</RouterLink>
        </template>
        <RouterLink to="/new" class="btn-accent">+ Post a listing</RouterLink>
      </nav>
    </div>
  </header>
</template>
