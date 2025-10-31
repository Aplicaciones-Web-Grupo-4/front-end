<template>
  <div class="tickets-page">
    <h1 class="page-title">Mis Entradas</h1>

    <div v-if="tickets.length" class="tickets-list">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
        <h3>{{ ticket.title }}</h3>
        <p><strong>Precio:</strong> S/. {{ ticket.price }}</p>
        <p><strong>Fecha de compra:</strong> {{ formatDate(ticket.date) }}</p>
      </div>
    </div>

    <p v-else class="no-tickets">Aún no has comprado entradas.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tickets = ref([])
const API_URL = import.meta.env.VITE_API_URL || 'https://db-server-1-66zf.onrender.com'

onMounted(async () => {
  try {
    const res = await axios.get(`${API_URL}/tickets`)
    tickets.value = res.data
  } catch (err) {
    console.error('Error al obtener tickets:', err)
  }
})

function formatDate(date) {
  return new Date(date).toLocaleString('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}
</script>

<style scoped>
.tickets-page {
  margin: 40px;
  font-family: "Inter", sans-serif;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.tickets-list {
  display: grid;
  gap: 20px;
}

.ticket-card {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  padding: 16px;
}

.ticket-card h3 {
  margin: 0 0 8px;
}

.no-tickets {
  text-align: center;
}
</style>
