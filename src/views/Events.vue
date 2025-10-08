<template>
  <div class="saved-container">
    <div class="saved-content">
      <h2>Saved Events</h2>

      <div v-if="filteredEvents.length === 0">
        <p class="no-saved-title">No saved events yet</p>
        <p class="no-saved-desc">
          Explore events and tap the heart icon to save them for later.
        </p>
        <RouterLink to="/home">
          <button class="explore-btn">Explore</button>
        </RouterLink>
      </div>

      <div v-else class="events-grid">
        <EventCard v-for="e in filteredEvents" :key="e.id" :event="e" :showSave="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import EventCard from '../components/EventCard.vue'

const events = ref([])
const query = ref('')

// obtener eventos guardados del backend
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/saved')
    events.value = res.data
    console.log('🟢 Eventos guardados cargados:', events.value)
  } catch (err) {
    console.error('❌ Error cargando eventos:', err)
  }
})

// filtro de búsqueda
const filteredEvents = computed(() =>
    events.value.filter(e =>
        e.title.toLowerCase().includes(query.value.toLowerCase())
    )
)
</script>

<style scoped>
.saved-container {
  font-family: 'Inter', sans-serif;
  background-color: #f9f8f5;
  min-height: 100vh;
  text-align: center;
}

.events-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}

.events-nav .logo {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-bar {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e1e1e1;
  background-color: #f3f1ea;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.saved-content {
  margin-top: 60px;
}

.saved-content h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.no-saved-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.no-saved-desc {
  color: #555;
  margin-bottom: 20px;
}

.explore-btn {
  background-color: #e9e2d0;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.happi-img {
  display: block;
  margin: 40px auto;
  width: 180px;
  opacity: 0.8;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
  padding: 0 48px;
}
</style>
