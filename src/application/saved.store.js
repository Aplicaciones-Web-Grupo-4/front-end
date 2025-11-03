import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSavedStore = defineStore('saved', () => {
  const savedEvents = ref([])

  // Cargar desde la API
  async function loadSaved() {
    const baseUrl = import.meta.env.VITE_API_URL || "https://db-server-1-66zf.onrender.com"
    const res = await fetch(`${baseUrl}/saved`)
    const data = await res.json()
    savedEvents.value = data
  }

  // Agregar nuevo evento
  function addSaved(event) {
    if (!savedEvents.value.some(e => e.eventId === event.eventId)) {
      savedEvents.value.push(event)
    }
  }

  return { savedEvents, loadSaved, addSaved }
})
