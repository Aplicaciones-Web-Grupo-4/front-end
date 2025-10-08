<template>
  <header class="organizer-header">
    <div class="logo">
      <img src="../../../assets/happi_logo.png" alt="happi-logo" class="logo-img" />
      <span>{{ $t('organizerHeader.logo') }}</span>
    </div>

    <nav class="nav-links">
      <RouterLink to="/org/entrepreneur">{{ $t('organizerHeader.nav.dashboard') }}</RouterLink>
      <RouterLink to="/org/register-stands">{{ $t('organizerHeader.nav.stands') }}</RouterLink>
      <RouterLink to="/org/create-event">{{ $t('organizerHeader.nav.createEvent') }}</RouterLink>
      <RouterLink to="/org/events">{{ $t('organizerHeader.nav.events') }}</RouterLink>
      <RouterLink to="/user/home"> Admin </RouterLink>
    </nav>

    <LanguageSwitcher />

    <div class="actions">
      <Button icon="pi pi-bell" class="p-button-rounded p-button-text" />
      <Avatar image="https://i.pravatar.cc/40" shape="circle" size="large" />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>

<style scoped>
.logo-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.organizer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
  padding: 12px 24px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  gap: 8px;
  color: #222;
}
.logo .pi {
  color: #f59e0b;
  font-size: 25px;
}

.nav-links {
  display: flex;
  gap: 24px;
}
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 450;
  font-size: 20px;
  transition: color 0.2s ease;
}
.nav-links a:hover {
  color: #f59e0b;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

:deep(.p-button.p-button-text.p-button-rounded) {
  color: #f59e0b; /* color del ícono */
}
:deep(.p-button.p-button-text.p-button-rounded:hover) {
  background-color: #fef3c7; /* color al pasar mouse */
}
</style>
