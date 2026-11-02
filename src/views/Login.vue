<script setup lang="ts">
import { useUserState } from '@/state/userState'
const {
    currentUserName, loading, message,
    registerName, registerPassword, loginName, loginPassword,
    submitRegister, submitLogin,
} = useUserState()
</script>

<template>
<div class="page">
    <div class="page-top">
        <h1 class="page-title">Account</h1>
    </div>

    <p v-if="currentUserName" class="panel logged-in">
        Logged in as <strong>{{ currentUserName }}</strong>
    </p>

    <p v-if="message" class="notice">{{ message }}</p>

    <div class="columns">
        <form class="panel form" @submit.prevent="submitLogin">
            <h2>Log in</h2>
            <label class="field">
                <span>Name</span>
                <input v-model="loginName" autocomplete="username" required>
            </label>
            <label class="field">
                <span>Password</span>
                <input v-model="loginPassword" type="password" autocomplete="current-password" required>
            </label>
            <div class="form-actions">
                <button type="submit" class="btn" :disabled="loading">Log in</button>
            </div>
        </form>

        <form class="panel form" @submit.prevent="submitRegister">
            <h2>Create account</h2>
            <label class="field">
                <span>Name</span>
                <input v-model="registerName" autocomplete="username" required>
            </label>
            <label class="field">
                <span>Password</span>
                <input v-model="registerPassword" type="password" autocomplete="new-password" required>
            </label>
            <div class="form-actions">
                <button type="submit" class="btn-outline" :disabled="loading">Create account</button>
            </div>
        </form>
    </div>
</div>
</template>

<style scoped>
/* login and register next to each other (stacked on phones) */
.columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 750px) {
    .columns {
        grid-template-columns: 1fr 1fr;
    }
}

.logged-in {
    margin: 0 0 1.5rem;
    border-left: 4px solid var(--green);
}

.notice {
    margin: 0 0 1.5rem;
    padding: 0.8rem 1rem;
    border-radius: var(--radius);
    background-color: var(--white);
    border: 1px solid var(--border);
    border-left: 4px solid var(--blue);
}
</style>
