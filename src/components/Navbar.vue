<template>
  <header class="main-header">
    <!-- 🔸 Logo -->
    <div class="logo">
      <img src="../assets/happi_logo.png" alt="NextHappen Logo" class="logo-img" />
      <span>{{ $t('header.logo') }}</span>
    </div>

    <!-- 🔸 Navigation links -->
    <nav class="nav-links">
      <RouterLink to="/user/home">{{ $t('header.nav.home') }}</RouterLink>
      <RouterLink to="/user/events">{{ $t('header.nav.events') }}</RouterLink>
      <RouterLink to="/user/explore">{{ $t('header.nav.explore') }}</RouterLink>
      <RouterLink to="/user/tickets">{{ $t('header.nav.tickets') }}</RouterLink>
      <RouterLink to="/user/following">{{ $t('header.nav.following') }}</RouterLink>
    </nav>

    <!-- 🔸 Right side actions -->
    <div class="actions">
      <div class="search-container">
        <i class="pi pi-search search-icon"></i>
        <input
            type="text"
            :placeholder="$t('header.search.placeholder')"
            class="search-input"
        />
      </div>

      <RouterLink to="/signup">
        <button class="signup-btn">{{ $t('header.signup') }}</button>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import LanguageSwitcher from "../organizer/presentation/components/LanguageSwitcher.vue";

const { t, locale } = useI18n()

const isEs = computed(() => locale.value === 'es')

function setLang(lang) {
  locale.value = lang
  localStorage.setItem('nh-locale', lang) // ✅ se guarda para próximos reloads
}

</script>

<style scoped>
/* === Contenedor principal === */
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffdf8;
  border-bottom: 1px solid #e0e0e0;
  padding: 14px 40px;
  font-family: 'Inter', sans-serif;
}

/* === Logo === */
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

/* === Navegación === */
.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 17px;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #f59e0b; /* Amarillo suave */
}

.nav-links a.router-link-active {
  color: #f59e0b;
  font-weight: 600;
}

/* === Acciones (lado derecho) === */
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* === Search input === */
.search-container {
  display: flex;
  align-items: center;
  background-color: #f9f4e8;
  border-radius: 8px;
  padding: 6px 10px;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 160px;
}

.search-icon {
  color: #bfa14a;
  font-size: 16px;
  margin-right: 8px;
}

/* === Botón Sign Up === */
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

.lang-switch button {
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
}

.lang-switch button.active {
  background-color: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

</style>
