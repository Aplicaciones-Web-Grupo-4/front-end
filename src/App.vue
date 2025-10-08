<template>
  <!-- Mostrar Navbar normal solo si no estás en /events -->
  <Navbar v-if="!$route.path.startsWith('/events')" />

  <!-- Mostrar la vista correspondiente -->
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
};
</script>