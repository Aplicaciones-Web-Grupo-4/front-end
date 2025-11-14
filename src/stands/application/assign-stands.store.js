import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

const API = import.meta.env.VITE_API_URL.replace(/\/+$/, "")

export const useAssignStandsStore = defineStore("assignStands", () => {
  const events = ref([])
  const stands = ref([])
  const loading = ref(false)

  // ---------------------------
  // Cargar eventos
  // ---------------------------
  async function fetchEvents() {
    loading.value = true
    try {
      const res = await axios.get(`${API}/events`)
      events.value = res.data
    } catch (e) {
      events.value = []
    } finally {
      loading.value = false
    }
  }

  // ---------------------------
  // Cargar stands del evento
  // ---------------------------
  async function fetchAssigned(eventId) {
    loading.value = true
    try {
      const res = await axios.get(`${API}/events/${eventId}/stands`)
      stands.value = res.data
    } catch (e) {
      stands.value = []
    } finally {
      loading.value = false
    }
  }

  // ---------------------------
  // Crear stand
  // ---------------------------
  async function add(eventId, payload) {
    const res = await axios.post(`${API}/events/${eventId}/stands`, payload)
    stands.value.push(res.data)
  }

  // ---------------------------
  // Editar stand
  // ---------------------------
  async function update(payload) {
    const res = await axios.put(`${API}/stands/${payload.id}`, payload)

    const i = stands.value.findIndex(s => s.id === payload.id)
    if (i !== -1) stands.value[i] = res.data
  }

  // ---------------------------
  // Eliminar stand
  // ---------------------------
  async function remove(id) {
    await axios.delete(`${API}/stands/${id}`)
    stands.value = stands.value.filter(s => s.id !== id)
  }

  return {
    events,
    stands,
    loading,
    fetchEvents,
    fetchAssigned,
    add,
    update,
    remove
  }
})
