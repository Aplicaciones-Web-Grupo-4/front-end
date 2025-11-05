<template>
  <div class="notifications-page">
    <h2 class="h-title mb-3">Últimas notificaciones</h2>

    <div v-if="notifications.length">
      <div
        v-for="n in notifications"
        :key="n.id"
        class="notif-card flex align-items-center gap-3 mb-3"
      >
        <i :class="getIcon(n.action)" class="notif-icon"></i>
        <div class="text">
          <p class="mb-1">
            <span v-html="getText(n)"></span>
          </p>
          <small class="p-muted">{{ formatDate(n.timestamp) }}</small>
        </div>
      </div>
    </div>

    <p v-else class="p-muted">Aún no tienes notificaciones recientes.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { MetricsApi } from '../metrics/infrastructure/metrics-api.js'
import { useStandsStore } from '../stands/application/stands.store.js'

const metricsApi = new MetricsApi()
const store = useStandsStore()
const notifications = ref([])

onMounted(async () => {
  await store.fetchFairs()
  const fairs = store.fairs
  const metrics = await metricsApi.getAll()

  // Combinar métricas con el título del evento
  notifications.value = metrics
    .map(m => ({
      ...m,
      eventTitle: fairs.find(f => f.id === m.eventId)?.title || "Evento desconocido"
    }))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // más recientes primero
})

// Texto dinámico de la notificación
function getText(n) {
  switch (n.action) {
    case "save":
      return `Un usuario guardó tu evento <strong>${n.eventTitle}</strong>`
    case "view":
      return `Tu evento <strong>${n.eventTitle}</strong> fue visto`
    case "ticket_purchase":
      return `Se vendió una entrada para <strong>${n.eventTitle}</strong>`
    default:
      return `Nueva interacción en <strong>${n.eventTitle}</strong>`
  }
}

// Ícono visual de PrimeIcons (para estilo futuro si usas PrimeVue)
function getIcon(action) {
  return action === "save"
    ? "pi pi-heart text-red-500"
    : action === "view"
    ? "pi pi-eye text-blue-500"
    : action === "ticket_purchase"
    ? "pi pi-ticket text-yellow-500"
    : "pi pi-info-circle text-gray-500"
}

// Formato de fecha y hora
function formatDate(date) {
  return new Date(date).toLocaleString("es-PE", {
    dateStyle: "short",
    timeStyle: "short"
  })
}
</script>

<style scoped>
.notifications-page {
  max-width: 80rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #000;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
  font-family: "Inter", sans-serif;
}
.notif-card {
  border: 2px solid #000;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 1);
  padding: 1rem;
  transition: transform 0.1s;
}
.notif-icon {
  font-size: 1.4rem;
}
.text p {
  margin: 0;
  font-size: 1rem;
}
.text small {
  color: #555;
}
</style>
