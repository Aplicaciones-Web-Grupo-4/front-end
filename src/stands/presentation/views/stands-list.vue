<template>
  <div class="stands-page">
    <h2 class="h-title mb-2">{{ $t('stands.title') }}</h2>
    <p class="mb-4 p-muted" style="max-width:680px;">{{ $t('stands.desc') }}</p>

    <div class="grid mb-3">
      <div class="col-12 md:col-6">
        <label class="block mb-2 p-muted">{{ $t('stands.selectFair') }}</label>
        <pv-dropdown
  v-model="selectedFair"
  :options="fairsWithAll"
  optionLabel="title"
  optionValue="id"
  placeholder="Selecciona una feria"
  class="fair-select"
/>
      </div>
    </div>

    <div class="table-container">
      <pv-data-table :value="filtered" :loading="loading" responsiveLayout="scroll" class="custom-table">
        <pv-column field="fair" :header="$t('stands.fair')" />
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
                class="edit-button"
                :label="$t('stands.edit')"
                icon="pi pi-pencil"
                @click="goEdit(data.id)"
            />
            <span class="mx-2"> </span>
            <pv-button
                class="delete-button"
                :label="$t('stands.edit')"
                icon="pi pi-trash"
                @click.prevent="onDelete(data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
    
    <router-link :to="{ name: 'org-stand-new' }">
      <pv-button class="add-button" :label="$t('stands.addEntrepreneur')" icon="pi pi-plus" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStandsStore } from '../../application/stands.store.js'

const store = useStandsStore()
const { t } = useI18n()
const router = useRouter()

const selectedFair = ref(null)
const ALL = computed(() => ({ id: 'ALL', title: t('common.all') }))

onMounted(async () => {
  await store.fetchFairs()  // ahora usa /events
  await store.fetchStands()
  selectedFair.value = ALL.value
})

// opciones = [Todas, ...ferias]
const fairsWithAll = computed(() => [ALL.value, ...store.fairs])
const loading = computed(() => store.loading)

const filtered = computed(() => {
  if (!selectedFair.value || selectedFair.value === 'ALL') return store.stands
  return store.stands.filter(s => s.fairId === selectedFair.value)
})


function goEdit(id) {
  router.push({ name: 'stand-edit', params: { id } })
}

async function onDelete(row) {
  if (confirm(`¿Eliminar a ${row.name}?`)) {
    await store.remove(row)
  }
}
</script>

<style scoped>
.stands-page {
  max-width: 80rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.custom-table {
  border: 2px solid #333;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

.add-button {
  margin-top: 2rem;
  border: 2px solid #333;
  height: 38px;
  background-color: #ffcd00;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.add-button:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

.edit-button {
  border: 2px solid #333;
  background-color: #ffcd00;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.edit-button:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

.delete-button {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  background-color: #d32f2f;
  font-size: 0.95rem;
  font-weight: bold;
}

.delete-button:hover {
  border: 2px solid #d32f2f;
  box-shadow: 3px 3px 0 rgba(211, 47, 47, 2);
  color: #d32f2f;
  background-color: #fff7ed;
  cursor: pointer;
}
</style>
