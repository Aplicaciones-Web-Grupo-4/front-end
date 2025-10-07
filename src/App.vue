<template>
  <div class="min-h-screen surface-ground text-color">
    <HeaderNav />
    <main class="p-3">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import HeaderNav from './components/HeaderNav.vue';
</script>
