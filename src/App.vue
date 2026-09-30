<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {submitLogin, submitRegister, registerName, registerPassword, loginName,loginPassword, loading, getUsersnames, currentUserName, users} from './userService'



onMounted(() => {
})

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

  <section>
    <h1>Users</h1>
    <button @click="getUsersnames()">Get users</button>
    <div class="list">
      <div v-for="user in users">{{ user }}</div>
    </div>
  </section>

</template>
