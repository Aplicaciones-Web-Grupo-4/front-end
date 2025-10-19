<template>
  <header class="main-header">

    <RouterLink to="/">
      <div class="logo">
        <img src="../assets/Group.png" alt="NextHappen Logo" class="logo-img" />
      </div>
    </RouterLink>

    <div class="center-section">
      <div class="search-container">
        <i class="pi pi-search search-icon"></i>
        <input
            type="text"
            :placeholder="$t('header.search.placeholder')"
            class="search-input"
        />
      </div>
    </div>

    <nav class="actions">
      <LanguageSwitcher />

      <RouterLink to="/user/home">
        <pv-button icon="pi pi-home" class="options" />
      </RouterLink>

      <RouterLink to="/user/events">
        <pv-button icon="pi pi-calendar" class="options" />
      </RouterLink>

      <RouterLink to="/user/explore">
        <pv-button icon="pi pi-compass" class="options" />
      </RouterLink>

      <RouterLink to="/user/tickets">
        <pv-button icon="pi pi-ticket" class="options" />
      </RouterLink>

      <RouterLink to="/org">
        <pv-button icon="pi pi-users" class="options" />
      </RouterLink>

      <RouterLink to="/signup">
        <button class="signup-btn">{{ $t('header.signup') }}</button>
      </RouterLink>
    </nav>
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
  localStorage.setItem('nh-locale', lang)
}
</script>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffdf8;
  border-bottom: 2px solid #333;
  padding: 10px 40px;
  font-family: 'Inter', sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-img {
  display: block;
  height: auto;
  width: auto;
  max-height: 45px;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
}

.center-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  justify-content: center;
}

.search-container {
  display: flex;
  align-items: center;
  border: 2px solid #333;
  padding: 5px 10px;
  width: 20%;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.search-icon {
  font-size: 16px;
  margin-right: 8px;
}

:deep(.search-container:hover) {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
}

:deep(.options.p-button) {
  width: 45px;
  height: 45px;
  border: 2px solid #333;
  background-color: #f8f8f8;
  padding: 3px;
  align-items: center;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20)
}

:deep(.options.p-button:hover) {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

:deep(.options .pi) {
  font-size: 1.5rem;
  color: #333;
}

.signup-btn {
  background-color: #ffcd00;
  border: 2px solid #333;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.signup-btn:hover {
  border: 2px solid #f59e0b;
  color: #f59e0b;
  background-color: #ffffff;
  box-shadow: 3px 3px 0 rgb(245, 158, 11, 1);
}

:deep(.options.p-button:hover .p-button-icon) {
  color: #f59e0b !important;
}

:deep(.actions a) {
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  align-items: center;
}
</style>