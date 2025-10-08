<template>
  <div class="home-page">
    <h2 class="page-title">{{ $t('home.title') }}</h2>

    <div v-if="events.length" class="event-list">
      <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          @save="onSave"
      />
    </div>

    <p v-else>{{ $t('home.noEvents') }}</p>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const query = ref('')
const events = ref([])
const savedIds = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/events')
    events.value = res.data.map(e => ({
      ...e,
      image: e.photos && e.photos.length > 0
          ? e.photos[0]
          : "https://via.placeholder.com/400x200?text=No+Image"
    }))

    console.log("Eventos cargados:", events.value)
  } catch (err) {
    console.error("Error cargando eventos:", err)
  }
})

// 💾 Guardar evento
async function onSave(id) {
  try {
    const key = 'nh_saved'
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []

    if (!arr.includes(id)) {
      arr.push(id)
      localStorage.setItem(key, JSON.stringify(arr))

      const eventToSave = { ...events.value.find(e => e.id === id) }
      delete eventToSave.id

      await axios.post('http://localhost:3000/saved', eventToSave)
      alert(t('home.alerts.saved'))
    } else {
      alert(t('home.alerts.alreadySaved'))
    }
  } catch (error) {
    console.error('Error al guardar evento:', error)
    alert(t('home.alerts.error'))
  }
}
</script>