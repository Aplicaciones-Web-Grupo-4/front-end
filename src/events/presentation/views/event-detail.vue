<!-- events/presentation/views/event-detail.vue -->
<template>
  <section class="page container">
    <div class="surface-card p-4 border-round">
      <!-- Loading / Error -->
      <div v-if="status === 'loading'" class="text-700">{{ t('common.loading') }}</div>
      <div v-else-if="status === 'error'" class="text-red-600">{{ error }}</div>

      <template v-else-if="event">
        <!-- Cover -->
        <img :src="coverUrl" alt="cover" class="w-full border-round mb-3" />

        <!-- Descripción -->
        <p class="text-900 line-height-3">{{ event.description }}</p>

        <!-- Horarios -->
        <h3 class="text-900 mt-4 mb-2">{{ t('events.details.schedule') }}</h3>
        <ul class="list-none p-0 m-0">
          <li v-for="(s, i) in event.schedules" :key="i" class="mb-1">{{ s }}</li>
        </ul>

        <!-- Ubicación -->
        <h3 class="text-900 mt-4 mb-2">{{ t('events.details.location') }}</h3>
        <div class="border-round overflow-hidden" style="height: 340px;">
          <iframe
              :src="mapEmbed"
              width="100%" height="100%" style="border:0"
              loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <!-- Stands -->
        <h3 class="text-900 mt-4 mb-3">{{ t('events.details.registeredStands') }}</h3>
        <div v-if="!event.stands?.length" class="text-700">
          {{ t('events.details.noStands') }}
        </div>
        <div v-else class="grid">
          <div v-for="stand in event.stands" :key="stand.id" class="col-12 sm:col-6 md:col-3">
            <div class="border-1 surface-border border-round overflow-hidden">
              <img :src="stand.image" :alt="stand.name" class="w-full" />
              <div class="p-3">
                <div class="font-medium text-900">{{ stand.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex gap-2 mt-3">
          <pv-button :label="t('events.details.actions.addFavorite')" icon="pi pi-star" outlined @click="onFavorite" />
          <pv-button :label="t('events.details.actions.share')" icon="pi pi-share-alt" @click="onShare" />
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '../../application/event.store';

const { t } = useI18n();
const route = useRoute();
const store = useEventStore();

const slug = computed(() => route.params.slug ?? 'feria-artesania-gastronomia');

onMounted(() => store.loadBySlug(slug.value));
watch(slug, (s, prev) => { if (s !== prev) store.loadBySlug(s); });

const status = computed(() => store.status);
const error = computed(() => store.error);
const event = computed(() => store.current);

// Resuelve cover, tanto si viene como ruta relativa o absoluta:
const coverUrl = computed(() => {
  if (!event.value?.cover) return '';
  // Si ya parece absoluta, úsala tal cual
  if (/^https?:\/\//.test(event.value.cover)) return event.value.cover;
  // Si apunta dentro de src, conviértela con import.meta.url
  try {
    return new URL(event.value.cover, import.meta.url).href;
  } catch {
    return event.value.cover;
  }
});

// OpenStreetMap embed
const mapEmbed = computed(() => {
  if (!event.value?.location) return '';
  const { lat, lng } = event.value.location;
  const delta = 0.06;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
});

function onFavorite() {
  // placeholder de UI: reemplaza con toast de PrimeVue si ya lo usas
  console.log('Favorito agregado');
}
function onShare() {
  console.log('Compartir en redes');
}
</script>

<style scoped>
.page.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
