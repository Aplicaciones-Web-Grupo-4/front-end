<template>
  <div class="home-page">
    <h2 class="page-title">{{ $t('home.title') }}</h2>

    <div v-if="events.length" class="event-list">
      <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          @save="onSave"
          class="event-card"
      />
    </div>

    <p v-else>{{ $t('home.eventsPage.noEvents') }}</p>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

// ✔️ ESTA ES TU VARIABLE REAL
const API = import.meta.env.VITE_API_URL

const events = ref([])
const savedIds = ref([])

onMounted(async () => {
  try {
    // ❌ API_URL → ❌ ERROR
    // ✔️ API → FUNCIONA
    const res = await axios.get(`${API}/api/events/public`)

    events.value = res.data.map(e => ({
      ...e,
      image: e.photos?.length
        ? e.photos[0]
        : 'https://via.placeholder.com/400x200?text=No+Image'
    }))

    console.log("Eventos cargados:", events.value)

  } catch (err) {
    console.error("Error cargando eventos:", err)
  }
})

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

      // ❌ API_URL → ❌ ERROR
      // ✔️ API → OK
      await axios.post(`${API}/api/saved`, eventToSave)
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


<style scoped>
.home-page {
  margin: 40px
}

.event-card{
  border: 2px solid #333;
  border-radius: 0;
  margin-top: 20px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0,2);
}
</style>
