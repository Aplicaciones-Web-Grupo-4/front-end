<template>
  <div>
    <!-- Header fijo -->
    <OrganizerHeader />

    <!-- Aquí se muestran las vistas del router -->
    <main class="p-3">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import OrganizerHeader from './organizer/presentation/components/organizer-header.vue'
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>



