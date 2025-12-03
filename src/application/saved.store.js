import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSavedStore = defineStore('saved', () => {
  const savedEvents = ref(JSON.parse(localStorage.getItem('nh_saved') || '[]'))

  function persist() {
    localStorage.setItem('nh_saved', JSON.stringify(savedEvents.value))
  }

  // Saber si ya está guardado
  function isSaved(id) {
    return savedEvents.value.some(e => e.id === id)
  }

  // Guardar evento
  function addSaved(event) {
    if (!isSaved(event.id)) {
      savedEvents.value.push(event)
      persist()
    }
  }

  // Quitar guardado
  function removeSaved(id) {
    savedEvents.value = savedEvents.value.filter(e => e.id !== id)
    persist()
  }

  return {
    savedEvents,
    isSaved,
    addSaved,
    removeSaved
  }
})
