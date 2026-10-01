<script setup lang="ts">
import { computed, ref } from 'vue'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { useUserState } from '@/state/userState'

//same thing gets only needed functions and varaibles
const { registerName, registerPassword, loading, message, submitRegister } = useUserState()

// second password field, only checked here in the form
const passwordAgain = ref('')
const mismatch = computed(() => passwordAgain.value !== '' && passwordAgain.value !== registerPassword.value)

async function submit() {
  if (registerPassword.value !== passwordAgain.value) {
    message.value = "passwords don't match"
    return
  }
  await submitRegister()
  passwordAgain.value = ''
}
</script>

<template>
  <form class="box" @submit.prevent="submit">
    <div class="box-head">Create account</div>
    <div class="space-y-3 p-3">
      <label class="block">
        <span class="label">Name</span>
        <input v-model="registerName" autocomplete="username" required class="input" />
      </label>
      <label class="block">
        <span class="label">Password</span>
        <input v-model="registerPassword" type="password" autocomplete="new-password" required class="input" />
        <span class="mt-1 block text-xs text-gray-500">At least {{ PASSWORD_MIN_LENGTH }} characters.</span>
      </label>
      <label class="block">
        <span class="label">Password again</span>
        <input
          v-model="passwordAgain"
          type="password"
          autocomplete="new-password"
          required
          class="input"
          :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500': mismatch }"
        />
        <span v-if="mismatch" class="mt-1 block text-xs text-red-600">Passwords don't match.</span>
      </label>
      <p v-if="message" class="border bg-gray-50 px-2 py-1.5 text-xs text-gray-700">{{ message }}</p>
      <button type="submit" :disabled="loading || mismatch" class="btn w-full">
        {{ loading ? 'Creating...' : 'Create account' }}
      </button>
    </div>
  </form>
</template>
