<script setup lang="ts">
import { useUserState } from '@/state/userState'

//gets only needed functions and varaibles
const { loginName, loginPassword, loading, currentUserName, submitLogin } = useUserState()

</script>

<template>
  <section>
    <h1>Login</h1>
    <form @submit.prevent="submitLogin()">
      <input v-model="loginName" placeholder="name" />
      <input v-model="loginPassword" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="loading" class="status">...</p>
    <h3 v-if="currentUserName">{{ currentUserName }}</h3>
  </section>
</template>
