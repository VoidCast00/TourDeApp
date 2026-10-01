<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { useUserState } from '@/state/userState'

const router = useRouter()
const { currentUserName, message } = useUserState()

message.value = '' // don't show leftovers from the register page

// go back home once the login worked
watch(currentUserName, (name) => {
  if (name) router.push('/')
})
</script>

<template>
  <div class="mx-auto max-w-sm space-y-3">
    <LoginForm />
    <p class="text-center text-xs text-gray-500">
      No account yet? <RouterLink to="/register" class="link">Register</RouterLink>
    </p>
  </div>
</template>
