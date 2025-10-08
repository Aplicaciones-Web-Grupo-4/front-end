<template>
  <div class="page container">
    <h1 class="page-title">Featured Events</h1>

    <section class="events">
      <EventCard
          v-for="e in filteredEvents"
          :key="e.id"
          :event="e"
          :showSave="true"
          @save="onSave"
      />
    </section>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// estado reactivo
const query = ref('')
const events = ref([])      // todos los eventos
const savedIds = ref([])    // ids de eventos guardados

// obtener los eventos del backend JSON Server
onMounted(async () => {
  try {
    // obtener todos los eventos
    const resEvents = await axios.get('http://localhost:3000/events')
    events.value = resEvents.data.map(e => ({
      ...e,
      image: e.image.startsWith('http') ? e.image : `${window.location.origin}${e.image}`
    }))
    // obtener todos los guardados
    const resSaved = await axios.get('http://localhost:3000/saved')
    savedIds.value = resSaved.data.map(e => e.title)

    console.log('Guardados:', savedIds.value)
  } catch (err) {
    console.error('Error cargando eventos:', err)
  }
})

// filtrar por búsqueda (opcional)
const filteredEvents = computed(() =>
    events.value.filter(e =>
        e.title.toLowerCase().includes(query.value.toLowerCase())
    )
)

async function onSave(id) {
  try {
    const key = 'nh_saved'
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []

    if (!arr.includes(id)) {
      arr.push(id)
      localStorage.setItem(key, JSON.stringify(arr))

      // buscar el evento en la lista actual
      const eventToSave = { ...events.value.find(e => e.id === id) }
      delete eventToSave.id // evita conflicto de id duplicado en JSON Server

      // guardar también en el backend
      const res = await axios.post('http://localhost:3000/saved', eventToSave)
      console.log('Evento guardado en backend:', res.data)

      alert('✅ Evento guardado en backend y localStorage')
    } else {
      alert('⚠️ Este evento ya está guardado')
    }
  } catch (error) {
    console.error('❌ Error al guardar evento:', error)
  }
}
</script>
