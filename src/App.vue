<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {submitLogin, submitRegister, registerName, registerPassword, loginName,loginPassword, loading, getUsersnames, currentUserName, users} from './userService'



onMounted(() => {
})

</script>


<template>
  <h1>register</h1> 
  <form @submit.prevent="submitRegister()">
    <input v-model="registerName" placeholder="name" />
    <input v-model="registerPassword" type="password" placeholder="password" />
    <button type="submit">Register</button>
  </form><br>
<h1>Login:</h1>
  <form @submit.prevent="submitLogin()">
    <input v-model="loginName" placeholder="name" />
    <input v-model="loginPassword" type="password" placeholder="password" />
    <button type="submit">Login</button>
  </form><p v-if="loading">...</p> <br>

  

  <button @click="getUsersnames()">get users</button>
  <div v-for="user in users">{{ user }}</div>

  
  <div> <h3>{{ currentUserName }}</h3></div>

</template>
