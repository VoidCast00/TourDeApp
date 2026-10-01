<script setup lang="ts">
import { useUserState } from '@/state/userState'

//same thing gets only needed functions and varaibles
const { registerName, registerPassword, submitRegister } = useUserState()
</script>

<template>
  <section>
    <h1>Register</h1>
    <form @submit.prevent="submitRegister()">
      <input v-model="registerName" placeholder="name" />
      <input v-model="registerPassword" type="password" placeholder="password" />
      <button type="submit">Register</button>
    </form>
  </section>
</template>
