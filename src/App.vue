<template>
  <div>
    <!-- 👤 Header de usuario -->
    <header v-if="isUser" class="main-header">
      <div class="logo">
        <img src="../src/assets/happi_logo.png" alt="NextHappen Logo" class="logo-img" />
        <span>NextHappen</span>
      </div>

      <nav class="nav-links">
        <RouterLink to="/user/home">Home</RouterLink>
        <RouterLink to="/user/events">Events</RouterLink>
        <RouterLink to="/user/explore">Explore</RouterLink>
        <RouterLink to="/user/tickets">Tickets</RouterLink>
        <RouterLink to="/user/following">Following</RouterLink>
      </nav>

      <div class="actions">
        <div class="search-container">
          <i class="pi pi-search search-icon"></i>
          <input type="text" placeholder="Search" class="search-input" />
        </div>
        <RouterLink to="/signup">
          <button class="signup-btn">Sign Up</button>
        </RouterLink>
      </div>
    </header>

    <!-- 🧑‍💼 Header del organizador -->
    <OrganizerHeader v-if="isOrganizer" />

    <!-- Contenido dinámico -->
    <main class="p-3">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterView, RouterLink } from 'vue-router'
import OrganizerHeader from './organizer/presentation/components/organizer-header.vue'
import 'primeicons/primeicons.css'

// Detecta el tipo de panel según la ruta
const route = useRoute()
const isOrganizer = computed(() => route.path.startsWith('/org'))
const isUser = computed(() => route.path.startsWith('/user'))
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* ===== Header principal (usuario) ===== */
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffdf8;
  border-bottom: 1px solid #e0e0e0;
  padding: 14px 40px;
  font-family: 'Inter', sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 22px;
  color: #222;
}

.logo-img {
  width: 55px;
  height: 55px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 17px;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #f59e0b;
}

.nav-links a.router-link-active {
  color: #f59e0b;
  font-weight: 600;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f9f4e8;
  border-radius: 8px;
  padding: 6px 10px;
}

.search-icon {
  color: #bfa14a;
  font-size: 16px;
  margin-right: 8px;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 160px;
}

.signup-btn {
  background-color: #ffcd00;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.signup-btn:hover {
  background-color: #f5c000;
}

/* ===== Contenido ===== */
main {
  padding: 16px;
}
</style>
