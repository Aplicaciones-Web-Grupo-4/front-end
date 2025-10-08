<template>
  <div class="p-4">
    <h2 class="h-title mb-2">{{ $t('stands.title') }}</h2>
    <p class="mb-4 p-muted" style="max-width:680px;">{{ $t('stands.desc') }}</p>

    <div class="grid mb-3">
      <div class="col-12 md:col-6">
        <label class="block mb-2 p-muted">{{ $t('stands.selectFair') }}</label>
        <pv-dropdown
            v-model="selectedFair"
            :options="fairsWithAll"
            optionLabel="name"
            class="w-full"
            :showClear="true"
        />
      </div>
      <div class="col-12 md:col-6 flex align-items-end justify-content-end">
        <router-link :to="{ name: 'stand-new' }">
          <pv-button class="nh-btn" :label="$t('stands.addEntrepreneur')" icon="pi pi-plus" />
        </router-link>
      </div>
    </div>

    <pv-data-table :value="filtered" :loading="loading" responsiveLayout="scroll" class="surface-card">
      <pv-column field="name" :header="$t('stands.name')" />
      <pv-column field="category" :header="$t('stands.category')">
        <template #body="{ data }">
          <span class="nh-link">{{ data.category }}</span>
        </template>
      </pv-column>
      <pv-column field="code" :header="$t('stands.stand')" />
      <pv-column :header="$t('stands.actions')" style="width:12rem">
        <template #body="{ data }">
          <pv-button
              class="p-button-text"
              :label="$t('stands.edit')"
              icon="pi pi-pencil"
              @click="goEdit(data.id)"
          />
          <span class="mx-2">·</span>
          <a class="nh-link" href="#" @click.prevent="onDelete(data)">Eliminar</a>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStandsStore } from '../../application/stands.store.js';

const store = useStandsStore();
const router = useRouter();
const { t } = useI18n();

// Sentinel reactivo para "Todas"
const ALL = computed(() => ({ id: 'ALL', name: t('common.all') }));
const selectedFair = ref(null);

onMounted(async () => {
  await store.fetchFairs();
  await store.fetchStands();
  // set inicial a "Todas"
       selectedFair.value = ALL.value;
});

// opciones = [Todas, ...ferias]
const fairsWithAll = computed(() => [ALL.value, ...store.fairs]);
const loading = computed(() => store.loading);

const filtered = computed(() => {
  // si está 'Todas' o nulo -> mostrar todo
  if (!selectedFair.value || selectedFair.value.id === 'ALL') return store.stands;
  return store.stands.filter(s => s.fairId === selectedFair.value.id);
});

function goEdit(id) {
  router.push({ name: 'stand-edit', params: { id } });
}

async function onDelete(row) {
  if (confirm(`¿Eliminar a ${row.name}?`)) {
    await store.remove(row);
  }
}
</script>
