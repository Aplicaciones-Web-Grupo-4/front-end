<template>
  <div class="min-h-screen surface-ground text-color">
    <HeaderNav />
    <router-view />
  </div>
</template>

<script setup>
import HeaderNav from './components/HeaderNav.vue';
</script>
