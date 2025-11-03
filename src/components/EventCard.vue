<template>
  <div class="event-card">
    <!-- Imagen: registra visualización -->
    <div class="img-wrap" @click="registerView">
      <img :src="props.event.image" :alt="props.event.title" />
    </div>

    <!-- Contenido -->
    <div class="body">
      <h3 class="title">{{ props.event.title }}</h3>
    </div>

    <!-- Botón Guardar -->
    <pv-button
      v-if="props.showSave"
      class="btn-save"
      icon="pi pi-heart"
      @click="onSave"
    />

    <!-- Botón Ver -->
    <pv-button
      class="btn-eye"
      icon="pi pi-eye"
      @click="handleView"
    />
  </div>
</template>

<script setup>
import { useSavedStore } from '../application/saved.store.js'
import { MetricsApi } from '../metrics/infrastructure/metrics-api.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const savedStore = useSavedStore()
const api = new MetricsApi()
const baseUrl = import.meta.env.VITE_API_URL || "https://db-server-1-66zf.onrender.com"

const props = defineProps({
  event: Object,
  showSave: { type: Boolean, default: true }
})

const currentUser = 'Marquinho'

// 👁️ Registrar visualización (solo métrica)
async function registerView() {
  if (!props.event?.id) return
  try {
    await api.registerAction(props.event.id, 'view')
  } catch (e) {
    console.error('Error registrando view:', e)
  }
}

// ❤️ Guardar evento
async function onSave() {
  if (!props.event?.id) return
  try {
    const res = await fetch(`${baseUrl}/saved?user=${currentUser}&eventId=${props.event.id}`)
    const existing = await res.json()

    if (existing.length === 0) {
      const savedEvent = {
        id: Date.now(), // ID del registro guardado
        user: currentUser,
        eventId: props.event.id, // referencia al evento original
        title: props.event.title,
        description: props.event.description,
        image: props.event.image,
        photos: props.event.photos || [],
        timestamp: new Date().toISOString()
      }

      await fetch(`${baseUrl}/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savedEvent)
      })

      savedStore.addSaved(savedEvent)
      await api.registerAction(props.event.id, 'save')
      console.log('✅ Guardado y store actualizada')
    } else {
      console.log('⚠️ Evento ya estaba guardado.')
    }
  } catch (e) {
    console.error('Error registrando save:', e)
  }
}

// 👁️ Ver evento (redirige al detalle correcto)
async function handleView() {
  try {
    await api.registerAction(props.event.id, 'view')
  } catch (e) {
    console.error('Error registrando vista:', e)
  }

  // Usa el id real del evento si viene de "saved"
  const realId = props.event.eventId || props.event.id

  router.push({ name: 'user-publishment', params: { id: realId } })
}
</script>

<style scoped>
.event-card {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
}

/* ==== Botones ==== */
.btn-eye,
.btn-save {
  width: 45px;
  height: 45px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  border-radius: 0;
  border: 2px solid #333;
  background-color: #fff;
}

/* === Ícono base === */
:deep(.p-button-icon) {
  margin: 0 !important;
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
  transition: color 0.2s ease;
}

/* === Hover SAVE (corazón rojo) === */
.btn-save:hover {
  border-color: red;
  box-shadow: none;
  cursor: pointer;
}
.btn-save:hover :deep(.p-button-icon) {
  color: red;
}

/* === Hover EYE (azul) === */
.btn-eye:hover {
  border-color: #2563eb;
  box-shadow: none;
  cursor: pointer;
}
.btn-eye:hover :deep(.p-button-icon) {
  color: #2563eb;
}

/* ==== Imagen ==== */
.img-wrap {
  height: 100%;
  width: 180px;
  flex-shrink: 0;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  overflow: hidden;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ==== Texto ==== */
.body {
  flex: 1;
}

.title {
  font-size: 22px;
  margin: 0 0 8px;
  font-weight: 800;
}

/* ==== Responsivo ==== */
@media (max-width: 640px) {
  .event-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .img-wrap {
    width: 100%;
    height: 180px;
  }

  .btn-save {
    position: static;
    margin-top: 8px;
  }
}
</style>
