<template>
  <div class="event-card">
    <!-- Imagen -->
    <div class="img-wrap" @click="registerView">
      <img :src="props.event.image" :alt="props.event.title" />
    </div>

    <!-- Título -->
    <div class="body">
      <h3 class="title">{{ props.event.title }}</h3>
    </div>

    <pv-button
    v-if="props.showSave"
    class="btn-save"
    :icon="isSaved ? 'pi pi-heart-fill' : 'pi pi-heart'" 
    @click="toggleSave"
    />

    <pv-button
      class="btn-eye"
      icon="pi pi-eye"
      @click="handleView"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
const isSaved = ref(false)
const savedId = ref(null) // para poder eliminarlo luego

onMounted(async () => {
  if (!props.event?.id) return
  try {
    const res = await fetch(`${baseUrl}/saved`)
    const data = await res.json()

    const existing = data.find(
      e => e.user === currentUser && e.eventId === props.event.id
    )

    if (existing) {
      isSaved.value = true
      savedId.value = existing.id
    }
  } catch (err) {
    console.error('Error verificando guardado:', err)
  }
})

async function registerView() {
  if (!props.event?.id) return
  try {
    await api.registerAction(props.event.id, 'view')
  } catch (e) {
    console.error('Error registrando view:', e)
  }
}

async function toggleSave() {
  if (!props.event?.id) return
  try {
    const res = await fetch(`${baseUrl}/saved`)
    const allSaved = await res.json()

    const existing = allSaved.find(
      e => e.user === currentUser && e.eventId === props.event.id
    )

    if (existing) {
      await fetch(`${baseUrl}/saved/${existing.id}`, { method: 'DELETE' })
      isSaved.value = false
      savedId.value = null
      await api.registerAction(props.event.id, 'unsave')
      console.log('💔 Evento desguardado')
      return
    }

    const newSaved = {
      id: Date.now(),
      user: currentUser,
      eventId: props.event.id,
      title: props.event.title,
      description: props.event.description,
      image: props.event.image,
      photos: props.event.photos || [],
      timestamp: new Date().toISOString()
    }

    await fetch(`${baseUrl}/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSaved)
    })

    savedStore.addSaved(newSaved)
    await api.registerAction(props.event.id, 'save')
    isSaved.value = true
    savedId.value = newSaved.id
    console.log('✅ Guardado correctamente')
  } catch (err) {
    console.error('Error en toggleSave:', err)
  }
}

async function handleView() {
  try {
    await api.registerAction(props.event.id, 'view')
  } catch (e) {
    console.error('Error registrando vista:', e)
  }

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

/* Ícono base */
:deep(.p-button-icon) {
  margin: 0 !important;
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
  transition: color 0.25s ease;
}

/* Hover SAVE */
.btn-save:hover {
  border-color: red;
  cursor: pointer;
  box-shadow: none;
}
.btn-save:hover :deep(.p-button-icon) {
  color: red;
}

/* Hover EYE */
.btn-eye:hover {
  border-color: #2563eb;
  cursor: pointer;
  box-shadow: none;
}
.btn-eye:hover :deep(.p-button-icon) {
  color: #2563eb;
}

/* ==== Estado guardado permanente ==== */
.btn-saved {
  border-color: red !important;
  box-shadow: none !important;
}
.btn-saved :deep(.p-button-icon) {
  color: red !important;
}

:deep(.pi-heart-fill) {
  color: red !important;
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

/* ==== Responsive ==== */
@media (max-width: 640px) {
  .event-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .img-wrap {
    width: 100%;
    height: 180px;
  }
}
</style>
