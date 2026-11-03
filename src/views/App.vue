<script setup lang="ts">
import { useRoute } from 'vue-router'

// used to underline the nav link of the section you are in
const route = useRoute()
</script>

<template>
<header class="header">
    <div class="header-inner">
        <RouterLink to="/stops" class="logo">
            <img src="/images/logos/Think-different-Academy_LOGO_oficialni-bile.svg" alt="Think different Academy">
        </RouterLink>

        <nav class="nav">
            <RouterLink to="/stops" :class="{ active: route.path.startsWith('/stops') }">Stops</RouterLink>
            
            <RouterLink to="/login" :class="{ active: route.path === '/login' }">Log in</RouterLink>
        </nav>
    </div>
</header>

<main>
    <router-view/>
</main>

<footer class="footer">
    
</footer>
</template>

<style scoped>
.header {
    background-color: var(--blue);
}

.header-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.8rem 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.logo img {
    display: block;
    height: 44px;
    width: auto; /* keeps the logo from being stretched */
}

.nav {
    display: flex;
    gap: 1.5rem;
}

.nav a {
    color: var(--white);
    font-weight: 600;
    text-decoration: none;
    padding: 0.3rem 0;
    border-bottom: 3px solid transparent;
}

.nav a:hover {
    border-bottom-color: rgba(255, 255, 255, 0.5);
}

/* the section you are in */
.nav a.active {
    border-bottom-color: var(--green);
}

main {
    min-height: calc(100vh - 140px);
}

.footer {
    text-align: center;
    color: var(--text-light);
    font-size: 0.9rem;
    padding: 1.5rem 1rem;
    border-top: 1px solid var(--border);
}
</style>
