<template>
  <header class="organizer-header">
    <RouterLink class="organizer-logo" to="/">
      <div class="logo">
        <img src="../../../assets/Group.png" alt="NextHappen Logo" class="logo-img" />
      </div>
    </RouterLink>

    <div class="actions">
      <LanguageSwitcher />

      <RouterLink to="/org/entrepreneur">
        <pv-button icon="pi pi-chart-line" class="options p-button-text" />
      </RouterLink>

      <RouterLink to="/org/register-stands">
        <pv-button icon="pi pi-shop" class="options p-button-text" />
      </RouterLink>

      <RouterLink to="/org/create-event">
        <pv-button icon="pi pi-plus" class="options p-button-text" />
      </RouterLink>

      <RouterLink to="/org/events">
        <pv-button icon="pi pi-calendar" class="options p-button-text" />
      </RouterLink>

      <Button icon="pi pi-bell" class="options p-button-text" />

      <p class="profile"> Marquinho </p>

      <Avatar class="profile-img" image="https://i.pravatar.cc/40" />
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
  display: block;
  height: auto;
  width: auto;
  max-height: 45px;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
}

.organizer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffdf8;
  border-bottom: 2px solid #333;
  padding: 0 40px;
  font-family: 'Inter', sans-serif;
}

:deep(.profile){
  width: 90px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  margin-right: 10px;
  border: 2px solid #333;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
}

.profile-img {
  width: 40px !important;
  height: 40px !important;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
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
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 100)
}

:deep(.options.p-button:hover .p-button-icon) {
  color: #f59e0b !important;
}

:deep(.options .p-button-icon) {
  margin: 0 !important;
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 22px;
  color: #222;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.p-button.p-button-text.p-button-rounded) {
  color: #f59e0b;
}
:deep(.p-button.p-button-text.p-button-rounded:hover) {
  background-color: #fef3c7;
}

:deep(.actions a) {
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  align-items: center;
}
</style>
