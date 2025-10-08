<template>
  <div class="page container">
    <h1 class="page-title">Saved Events</h1>

    <div class="card">
      <div v-if="savedList.length === 0" class="empty">
        <img src="/src/assets/mascot.png" class="mascot" alt=""/>
        <div class="empty-title">No saved events yet</div>
        <div class="empty-sub">Explore events and tap the heart icon to save them for later.</div>
        <RouterLink to="/" class="explore-btn">Explore</RouterLink>
      </div>

      <div v-else class="saved-list">
        <EventCard
            v-for="s in savedList"
            :key="s.id"
            :event="s"
            :showSave="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const savedList = ref([])

async function loadSaved() {
  try {
    const res = await axios.get('http://localhost:3000/saved')
    savedList.value = res.data
    console.log('Eventos guardados:', savedList.value)
  } catch (error) {
    console.error('Error al cargar eventos guardados:', error)
  }
}

onMounted(loadSaved)
</script>
