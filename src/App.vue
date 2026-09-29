<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type User } from '@shared/types'


const users = ref<User[]>([])
const registerName = ref('')
const registerPassword = ref('')


async function getUsersnames() {
  try{
    const response = await fetch ("/api/v1/users");
    if(!response.ok) {throw new Error(response.status.toString())}
    const data = await response.json();
    users.value = data;
  }
  catch(err){
    console.error("failed to get users: ", err)
  }

}

async function addUser(name:string, password: string) {
  try{ 
    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, name }),
    });
    if(!response.ok){
      const error = await response.json();
      console.log(error);
      throw new Error(error.error)
    }

    console.log(response.json());
  }catch(err){
    console.error("Failed to create user: ", err)
  }
}

onMounted(() => {
})

</script>


<template>
  <form @submit.prevent="addUser(registerName, registerPassword)">
    <input v-model="registerName" placeholder="name" />
    <input v-model="registerPassword" type="password" placeholder="password" />
    <button type="submit">register</button>
  </form>

  <button @click="getUsersnames()">get users</button>
  <div v-for="user in users">{{ user }}</div>
</template>
