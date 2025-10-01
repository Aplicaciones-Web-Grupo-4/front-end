<template>
  <header class="organizer-header">
    <!-- Logo -->
    <div class="logo">
      <img src="../../../assets/happi_logo.png" alt="happi-logo" class="logo-img"/>
      <span>NextHappen</span>
    </div>

    <!-- Nav links -->
    <nav class="nav-links">
      <RouterLink to="/org/dashboard">Dashboard</RouterLink>
      <RouterLink to="/org/stands">Stands</RouterLink>
      <RouterLink to="/org/events/new">Create Event</RouterLink>
      <RouterLink to="/org/events">Events</RouterLink>
    </nav>

    <!-- Right side -->
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
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 12px 24px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  gap: 8px;
  color: #222;
}
.logo .pi {
  color: #f59e0b; /* amarillo */
  font-size: 25px;
}

/* Links de navegación */
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

/* Acciones a la derecha */
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

:deep(.p-button.p-button-text.p-button-rounded) {
  color: #f59e0b;         /* color del ícono */
}
:deep(.p-button.p-button-text.p-button-rounded:hover) {
  background-color: #fef3c7; /* color al pasar mouse */
}

</style>
