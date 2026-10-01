<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
import { useUserState } from '@/state/userState'

const { message } = useUserState()

message.value = '' // don't show leftovers from the login page
</script>

<template>
  <div class="mx-auto max-w-sm space-y-3">
    <RegisterForm />
    <p class="text-center text-xs text-gray-500">
      Already have an account? <RouterLink to="/login" class="link">Log in</RouterLink>
    </p>
  </div>
</template>
