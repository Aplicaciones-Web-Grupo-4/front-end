<template>
  <div id="app">
    <Navbar v-if="isUserRoute" />

    <OrganizerHeader v-else-if="isOrganizerRoute" />

    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Navbar from './components/Navbar.vue'
import OrganizerHeader from './organizer/presentation/components/organizer-header.vue'

const route = useRoute()

const isUserRoute = computed(() => route.path.startsWith('/user'))
const isOrganizerRoute = computed(() => route.path.startsWith('/org'))
</script>

<style>
body {
  margin: 0;
  background-color: #fffdf8;
  font-family: 'Inter', sans-serif;
}
</style>
