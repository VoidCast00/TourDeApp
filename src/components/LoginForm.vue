<script setup lang="ts">
import { useUserState } from '@/state/userState'

//gets only needed functions and varaibles
const { loginName, loginPassword, loading, message, submitLogin } = useUserState()
</script>

<template>
  <form class="box" @submit.prevent="submitLogin()">
    <div class="box-head">Log in</div>
    <div class="space-y-3 p-3">
      <label class="block">
        <span class="label">Name</span>
        <input v-model="loginName" autocomplete="username" required class="input" />
      </label>
      <label class="block">
        <span class="label">Password</span>
        <input v-model="loginPassword" type="password" autocomplete="current-password" required class="input" />
      </label>
      <p v-if="message" class="border bg-gray-50 px-2 py-1.5 text-xs text-gray-700">{{ message }}</p>
      <button type="submit" :disabled="loading" class="btn w-full">
        {{ loading ? 'Logging in...' : 'Log in' }}
      </button>
    </div>
  </form>
</template>
