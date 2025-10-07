<template>
  <div class="events-page">
    <!-- Header / Breadcrumb -->
    <header class="page-header">
      <nav class="breadcrumb">
        <router-link to="/" class="crumb">NextHappen</router-link>
        <span class="sep">/</span>
        <router-link to="/events" class="crumb">Eventos</router-link>
        <span class="sep">/</span>
        <span class="crumb current">{{ model.title }}</span>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <img
          class="hero-img"
          :src="model.coverUrl"
          :alt="`Imagen de portada de ${model.title}`"
          loading="lazy"
      />
    </section>

    <!-- Body -->
    <main class="container">
      <!-- Descripción -->
      <section class="block">
        <h1 class="title">{{ model.title }}</h1>
        <p class="description" v-html="model.description"></p>
      </section>

      <!-- Horarios -->
      <section class="block">
        <h2 class="subtitle">Horarios</h2>
        <ul class="schedule">
          <li v-for="(slot, i) in model.schedule" :key="i">
            <strong>{{ slot.label }}:</strong> {{ slot.start }} – {{ slot.end }}
          </li>
        </ul>
      </section>

      <!-- Ubicación (mapa) -->
      <section class="block">
        <h2 class="subtitle">Ubicación</h2>
        <div class="map-wrap">
          <iframe
              class="map"
              :src="googleMapsEmbedUrl"
              width="100%"
              height="360"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              :title="`Mapa de ${model.title}`"
          ></iframe>
        </div>
        <div class="address">
          <span class="pin">📍</span>
          <span>{{ model.address }}</span>
          <button class="btn-link" @click="openInMaps">Ver en Google Maps</button>
        </div>
      </section>

      <!-- Stands -->
      <section class="block">
        <div class="flex-row">
          <h2 class="subtitle">Stands Registrados</h2>
          <div class="actions">
            <button class="btn" :class="{ 'btn-outline': !isFav }" @click="toggleFavorite">
              {{ isFav ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
            </button>
            <button class="btn btn-outline" @click="shareEvent">Compartir en redes</button>
          </div>
        </div>

        <div class="grid">
          <article
              v-for="(stand, i) in model.stands"
              :key="i"
              class="card"
          >
            <img
                class="card-img"
                :src="stand.image"
                :alt="`Imagen del stand ${stand.name}`"
                loading="lazy"
            />
            <div class="card-body">
              <h3 class="card-title">{{ stand.name }}</h3>
              <p class="card-text">{{ stand.summary }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- Footer actions (mobile friendly) -->
      <section class="block block-sticky">
        <div class="sticky-actions">
          <button class="btn" :class="{ 'btn-outline': !isFav }" @click="toggleFavorite">
            {{ isFav ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
          </button>
          <button class="btn btn-outline" @click="shareEvent">Compartir en redes</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Este componente funciona solo en "presentation".
// Si no le pasas el prop `event`, usa MOCK_EVENT para que puedas ver la pantalla.

import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  // Permite inyectar el evento desde fuera cuando conectes tu store/API
  event: {
    type: Object,
    required: false,
    default: null
  }
})

const route = useRoute()

// Datos de prueba (puedes borrarlos cuando conectes tu store)
const MOCK_EVENT = {
  id: 'demo-1',
  title: 'Feria de Artesanía y Gastronomía',
  coverUrl:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&auto=format&fit=crop',
  description:
      'Descubre la Feria de Artesanía y Gastronomía, un evento vibrante que celebra la riqueza cultural de Lima. Disfruta de una muestra selecta de productores, emprendedores y cocineros con <strong>propuestas locales</strong>. La feria cuenta con zona de comida, experiencias culturales y actividades para toda la familia.',
  address: 'Parque de la Exposición, Cercado de Lima',
  lat: -12.063207,
  lng: -77.034889,
  schedule: [
    { label: 'Sábado', start: '10:00 AM', end: '8:00 PM' },
    { label: 'Domingo', start: '10:00 AM', end: '8:00 PM' }
  ],
  stands: [
    {
      name: 'Artesanías del Perú',
      summary: 'Cestería y tejidos tradicionales.',
      image:
          'https://images.unsplash.com/photo-1556909114-89e7d8b8ac5a?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Sabores Andinos',
      summary: 'Quesos, panes y dulces de sierra.',
      image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Textiles Milenarios',
      summary: 'Fibras naturales y tintes artesanales.',
      image:
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Cerámica Inka',
      summary: 'Piezas utilitarias y decorativas.',
      image:
          'https://images.unsplash.com/photo-1523419409543-14f0d787f5c8?q=80&w=800&auto=format&fit=crop'
    }
  ]
}

const model = ref(props.event || MOCK_EVENT)

// Estado de favoritos (localStorage solo para demo/UI)
const isFav = ref(false)
const favKey = computed(() => `nh:fav:event:${model.value.id}`)

onMounted(() => {
  try {
    isFav.value = localStorage.getItem(favKey.value) === '1'
  } catch {}
})

// URL embebida del mapa (si hay lat/lng usa coords; sino, la dirección textual)
const googleMapsEmbedUrl = computed(() => {
  const { lat, lng, address } = model.value
  if (typeof lat === 'number' && typeof lng === 'number') {
    return `https://www.google.com/maps/embed/v1/view?key=&center=${lat},${lng}&zoom=14`
    // Nota: agrega tu API key si usas el modo Embed v1 con key.
  }
  const q = encodeURIComponent(address || model.value.title)
  return `https://www.google.com/maps?q=${q}&output=embed`
})

// Acciones
function openInMaps() {
  const { lat, lng, address, title } = model.value
  const q =
      typeof lat === 'number' && typeof lng === 'number'
          ? `${lat},${lng}`
          : encodeURIComponent(address || title)
  window.open(`https://www.google.com/maps?q=${q}`, '_blank')
}

function toggleFavorite() {
  isFav.value = !isFav.value
  try {
    if (isFav.value) localStorage.setItem(favKey.value, '1')
    else localStorage.removeItem(favKey.value)
  } catch {}
}

async function shareEvent() {
  const url = window.location.href
  const text = `${model.value.title} – ${model.value.address}`
  try {
    if (navigator.share) {
      await navigator.share({ title: model.value.title, text, url })
      return
    }
  } catch {}
  // Fallback: copiar al portapapeles
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`)
    alert('Enlace copiado al portapapeles.')
  } catch {
    alert('No se pudo compartir. Copia el enlace manualmente.')
  }
}
</script>

<style scoped>
/* Layout base */
.events-page {
  --container: 920px;
  --radius: 14px;
  --shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  --muted: #6b7280;
  --border: #e5e7eb;
  --bg: #ffffff;
  --bg-soft: #f8fafc;
  --primary: #111827;
}

.container {
  width: min(100%, var(--container));
  margin: 0 auto;
  padding: 0 16px 64px;
}

/* Breadcrumb */
.page-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.breadcrumb {
  width: min(100%, var(--container));
  margin: 0 auto;
  padding: 10px 16px;
  color: var(--muted);
  font-size: 14px;
}
.crumb {
  text-decoration: none;
  color: var(--muted);
}
.crumb.current {
  color: var(--primary);
  font-weight: 600;
}
.sep {
  margin: 0 8px;
}

/* Hero */
.hero {
  background: var(--bg);
}
.hero-img {
  width: min(100%, var(--container));
  height: 260px;
  object-fit: cover;
  display: block;
  margin: 16px auto 0 auto;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Blocks */
.block {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  margin-top: 18px;
  box-shadow: var(--shadow);
}

.title {
  font-size: 22px;
  margin: 0 0 8px 0;
  color: var(--primary);
}
.subtitle {
  font-size: 18px;
  margin: 0 0 12px 0;
  color: var(--primary);
}
.description {
  color: #111827;
  line-height: 1.6;
}

/* Schedule */
.schedule {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #111827;
}
.schedule li {
  padding: 6px 0;
  border-bottom: 1px dashed var(--border);
}
.schedule li:last-child {
  border-bottom: none;
}

/* Mapa */
.map-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  background: var(--bg-soft);
}
.map {
  display: block;
}
.address {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #111827;
}
.pin {
  font-size: 18px;
}
.btn-link {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0 6px;
  text-decoration: underline;
}

/* Stands */
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.actions {
  display: flex;
  gap: 8px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 12px;
}
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 720px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}
.card-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
.card-body {
  padding: 10px 12px 14px 12px;
}
.card-title {
  font-size: 15px;
  margin: 0 0 6px 0;
  color: var(--primary);
}
.card-text {
  font-size: 13px;
  color: var(--muted);
}

/* Botones */
.btn {
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}
.btn:hover { opacity: 0.95; }
.btn-outline {
  background: #fff;
  color: var(--primary);
}

/* Footer sticky (para móviles) */
.block-sticky {
  position: sticky;
  bottom: 0;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(6px);
  border: 1px solid var(--border);
}
.sticky-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
